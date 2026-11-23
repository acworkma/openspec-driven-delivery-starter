import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export function checkInventory(source, coverage, readDocument, hasFile) {
  const findings = [];
  const sourceIds = new Set(source.items.map((item) => item.id));
  const seen = new Set();
  if (source.items.length !== sourceIds.size) findings.push('Duplicate source IDs');
  for (const entry of coverage) {
    if (seen.has(entry.id)) findings.push(`Duplicate coverage ID: ${entry.id}`);
    seen.add(entry.id);
    const original = source.items.find((item) => item.id === entry.id);
    if (!original) {
      findings.push(`Unknown source ID: ${entry.id}`);
      continue;
    }
    if (!['automated', 'partial', 'deferred'].includes(entry.disposition)) {
      findings.push(`Invalid disposition: ${entry.id}`);
    }
    if (typeof entry.note !== 'string' || !entry.note.trim()) findings.push(`Missing explanation: ${entry.id}`);
    if (!hasFile(entry.contract)) {
      findings.push(`Missing contract: ${entry.id}`);
    } else {
      const document = readDocument(entry.contract);
      if (!document.includes(entry.id)) findings.push(`Missing contract ID: ${entry.id}`);
      const fragments = original.kind === 'scenario' ? original.text.split(' | ') : [original.text];
      const sourceNumbering = document.replace(/\b00[1-4]-(?=(?:FR|SC)-\d{3}|US\d+-AS\d+)/g, '');
      if (fragments.some((fragment) => !sourceNumbering.includes(fragment))) {
        findings.push(`Source behavior was lost or changed: ${entry.id}`);
      }
    }
    if (!Array.isArray(entry.evidence)) {
      findings.push(`Invalid evidence list: ${entry.id}`);
      continue;
    }
    if (entry.disposition !== 'deferred'
      && (!entry.evidence.some((file) => file.startsWith('src/'))
        || !entry.evidence.some((file) => file.startsWith('tests/')))) {
      findings.push(`Missing implementation or tests: ${entry.id}`);
    }
    for (const file of entry.evidence) {
      if (!hasFile(file)) findings.push(`Missing evidence file: ${file}`);
    }
  }
  for (const id of sourceIds) if (!seen.has(id)) findings.push(`Unaccounted source ID: ${id}`);
  return findings;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const source = JSON.parse(readFileSync('workshop/source-index.json', 'utf8'));
  const coverage = JSON.parse(readFileSync('workshop/coverage.json', 'utf8'));
  const findings = checkInventory(source, coverage, (file) => readFileSync(file, 'utf8'), existsSync);
  if (findings.length) {
    console.error(findings.join('\n'));
    process.exitCode = 1;
  } else console.log(`All ${source.items.length} source requirements, scenarios and outcomes have a preserved contract and explicit disposition.`);
}
