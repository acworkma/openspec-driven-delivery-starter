import test from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { prepareLab } from '../scripts/prepare-lab.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

test('learner preparation is non-destructive and the missing policy goes from red to green', () => {
  mkdirSync(join(root, 'context'), { recursive: true });
  const temporary = mkdtempSync(join(root, 'context', 'sdd-learner-test-'));
  const learner = join(temporary, 'learner');
  try {
    prepareLab(learner);
    assert.throws(() => prepareLab(learner), /already exists/);
    assert.match(readFileSync(join(learner, 'src', 'claim-visibility.js'), 'utf8'), /Implement the approved/);
    const command = ['--test', 'tests/claim-status.test.js'];
    const env = { ...process.env };
    // The learner is a separate runner, not a nested test in this worker.
    delete env.NODE_TEST_CONTEXT;
    const red = spawnSync(process.execPath, command, { cwd: learner, encoding: 'utf8', env });
    assert.equal(red.error, undefined);
    assert.equal(red.status, 1, red.stdout + red.stderr);
    assert.match(red.stdout, /Implement the approved/);
    const bdd = [join(root, 'node_modules', '@cucumber', 'cucumber', 'bin', 'cucumber.js'), '--tags', '@001'];
    const redBdd = spawnSync(process.execPath, bdd, { cwd: learner, encoding: 'utf8', env });
    assert.equal(redBdd.error, undefined);
    assert.equal(redBdd.status, 1, redBdd.stdout + redBdd.stderr);
    assert.match(redBdd.stdout, /Implement the approved/);
    cpSync(join(root, 'src', 'claim-visibility.js'), join(learner, 'src', 'claim-visibility.js'));
    const green = spawnSync(process.execPath, command, { cwd: learner, encoding: 'utf8', env });
    assert.equal(green.error, undefined);
    assert.equal(green.status, 0, green.stdout + green.stderr);
    const greenBdd = spawnSync(process.execPath, bdd, { cwd: learner, encoding: 'utf8', env });
    assert.equal(greenBdd.error, undefined);
    assert.equal(greenBdd.status, 0, greenBdd.stdout + greenBdd.stderr);
    const tasks = readFileSync(join(learner, 'openspec', 'changes', 'implement-dependent-privacy', 'tasks.md'), 'utf8');
    assert.doesNotMatch(tasks, /\[x\]/);
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
});

test('the pinned OpenSpec CLI archives only the bounded slice and preserves its history', () => {
  const temporary = mkdtempSync(join(tmpdir(), 'sdd-archive-test-'));
  const cli = join(root, 'node_modules', '@fission-ai', 'openspec', 'bin', 'openspec.js');
  const run = (...args) => {
    const result = spawnSync(process.execPath, [cli, ...args], {
      cwd: temporary, encoding: 'utf8', env: { ...process.env, OPENSPEC_TELEMETRY: '0' }
    });
    assert.equal(result.error, undefined);
    assert.equal(result.status, 0, result.stdout + result.stderr);
    return result;
  };
  try {
    cpSync(join(root, 'openspec'), join(temporary, 'openspec'), { recursive: true });
    const tasks = join(temporary, 'openspec', 'changes', 'implement-dependent-privacy', 'tasks.md');
    // This disposable fixture tests archive mechanics, not actual human approval.
    writeFileSync(tasks, '# Archive test fixture\n\n- [x] Complete test fixture.\n');
    run('archive', 'implement-dependent-privacy', '--yes');
    const current = join(temporary, 'openspec', 'specs', 'member-claim-privacy', 'spec.md');
    assert.equal(existsSync(current), true);
    assert.match(readFileSync(current, 'utf8'), /Requirement: No list trace/);
    const archive = join(temporary, 'openspec', 'changes', 'archive');
    const archived = readdirSync(archive).find((name) => name.endsWith('-implement-dependent-privacy'));
    assert.ok(archived);
    assert.equal(existsSync(join(archive, archived, 'proposal.md')), true);
    assert.equal(existsSync(join(temporary, 'openspec', 'changes', 'add-member-claim-status')), true);
    run('validate', '--all', '--strict', '--no-interactive');
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
});

test('the workshop agenda allocates exactly eight hours including lunch and both breaks', () => {
  const agenda = readFileSync(join(root, 'workshop', 'agenda.md'), 'utf8');
  const rows = [...agenda.matchAll(/^\| (?!Total\b)([^|\n]+)\| (\d+) \|/gm)];
  assert.equal(rows.reduce((sum, row) => sum + Number(row[2]), 0), 480);
  assert.equal(rows.filter((row) => row[1].trim() === 'Break').length, 2);
  assert.ok(rows.some((row) => row[1].trim() === 'Lunch'));
});
