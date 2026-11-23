import test from 'node:test';
import assert from 'node:assert/strict';
import { checkInventory } from '../scripts/check-traceability.js';

const source = { items: [{ id: '001-FR-001', kind: 'requirement', text: 'MUST preserve this behavior' }] };
const entry = {
  id: '001-FR-001', disposition: 'partial', note: 'UI integration deferred',
  contract: 'contract.md', evidence: ['src/sample.js', 'tests/sample.test.js']
};
const document = '001-FR-001 MUST preserve this behavior';

test('traceability accepts explicit partial coverage with preserved behavior', () => {
  assert.deepEqual(checkInventory(source, [entry], () => document, () => true), []);
});
test('traceability rejects missing, duplicate and foreign source IDs', () => {
  assert.match(checkInventory(source, [], () => document, () => true).join(), /Unaccounted/);
  assert.match(checkInventory(source, [entry, entry], () => document, () => true).join(), /Duplicate/);
  assert.match(checkInventory(source, [{ ...entry, id: 'unknown' }], () => document, () => true).join(), /Unknown/);
});
test('traceability rejects lost behavior, missing evidence and unexplained dispositions', () => {
  const findings = checkInventory(source, [{
    ...entry, note: '', evidence: [], disposition: 'complete'
  }], () => '001-FR-001', () => true).join();
  assert.match(findings, /lost or changed/);
  assert.match(findings, /Missing implementation/);
  assert.match(findings, /Missing explanation/);
  assert.match(findings, /Invalid disposition/);
});
