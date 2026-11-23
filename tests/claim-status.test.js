import test from 'node:test';
import assert from 'node:assert/strict';
import { canViewDependentClaim } from '../src/claim-visibility.js';
import { listDependentClaims, findDependentClaim } from '../src/claim-status.js';

const routine = { id: 'SYN-ROUTINE', status: 'Processed', billed: 100, planPaid: 80, sensitive: false };
const hidden = { id: 'SYN-HIDDEN', status: 'Denied', billed: 500, planPaid: 0, sensitive: true };
const input = (age = 16, confidential = false, claims = [routine, hidden]) => ({
  authenticated: true, subscriber: true, dependent: { age, confidential }, claims
});

test('001-FR-011: age boundaries and confidential requests fail closed', () => {
  for (const [age, sensitive, confidential, expected] of [
    [9, true, false, true], [12, true, false, true], [13, true, false, false],
    [17, false, false, true], [18, false, false, false], [19, false, false, false],
    [9, false, true, false], [undefined, false, false, false],
    [-1, false, false, false], [16, false, undefined, false],
    [16, undefined, false, false]
  ]) {
    assert.equal(canViewDependentClaim({ age, sensitive, confidential }), expected);
  }
});

test('001-US3-AS2: adding a hidden claim changes no list field or total', () => {
  assert.deepEqual(listDependentClaims(input()), listDependentClaims(input(16, false, [routine])));
  assert.equal(listDependentClaims(input()).billed, 100);
});

test('001-US3-AS4: confidential child looks exactly like an empty list', () => {
  assert.deepEqual(listDependentClaims(input(9, true)), listDependentClaims(input(9, false, [])));
});

test('001-US3-AS3: adult message never depends on existence of claims', () => {
  assert.deepEqual(listDependentClaims(input(19)), listDependentClaims(input(19, false, [])));
});

test('001-US3-AS5: hidden and nonexistent claim references have identical responses', () => {
  assert.deepEqual(findDependentClaim(input(), hidden.id), findDependentClaim(input(), 'SYN-MISSING'));
  assert.equal(findDependentClaim(input(), routine.id).status, 200);
  assert.equal(findDependentClaim(input(9), hidden.id).status, 200);
});

test('001: rejects unauthenticated callers and non-subscriber access', () => {
  assert.throws(() => listDependentClaims({ ...input(), authenticated: false }), /Unauthorized/);
  assert.throws(() => findDependentClaim({ ...input(), subscriber: false }, routine.id), /Forbidden/);
});
