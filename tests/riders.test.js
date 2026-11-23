import test from 'node:test';
import assert from 'node:assert/strict';
import { validateRiderRequest, approveConfiguration, DENTAL_TESTS, VISION_TESTS } from '../src/rider-readiness.js';
import { buildDentalConfiguration, dentalReadiness } from '../src/dental-rider.js';
import { buildVisionConfiguration, visionActivation } from '../src/vision-rider.js';

const request = {
  approvedOn: '2026-11-18', effectiveOn: '2027-01-01', groupActive: true, compatible: true
};
const evidence = (names = DENTAL_TESTS) => ({
  configurationApproved: true, administratorAccepted: true,
  results: names.map((name) => ({ name, expected: 100, actual: 100 }))
});

test('002/004-FR-002: accepts exactly 30 days, rejects short notice without both approvals', () => {
  assert.equal(validateRiderRequest({ ...request, approvedOn: '2026-12-02' }).accepted, true);
  const short = { ...request, approvedOn: '2026-12-03' };
  assert.equal(validateRiderRequest(short).accepted, false);
  assert.equal(validateRiderRequest({
    ...short, exception: { productOwner: true, underwriting: true, reason: 'Synthetic pilot exception' }
  }).accepted, true);
  for (const exception of [
    { productOwner: true, reason: 'Missing underwriting' },
    { productOwner: true, underwriting: true, reason: ' ' }
  ]) assert.equal(validateRiderRequest({ ...short, exception }).accepted, false);
});

test('002/004: rejects inactive, incompatible, terminated and mid-month requests', () => {
  for (const change of [
    { groupActive: false }, { compatible: false }, { coverageEndsOn: '2026-12-31' },
    { effectiveOn: '2027-01-15' }
  ]) assert.equal(validateRiderRequest({ ...request, ...change }).accepted, false);
  assert.throws(() => validateRiderRequest({ ...request, effectiveOn: '2027-02-30' }), /calendar date/);
  assert.throws(() => validateRiderRequest({ ...request, groupActive: 'yes' }), /booleans/);
});

test('002-US2-AS3 / 004-US2-AS2: an author cannot approve their configuration', () => {
  assert.throws(() => approveConfiguration({ author: 'SYN-A', reviewer: 'SYN-A' }), /second/);
  assert.equal(approveConfiguration({ author: 'SYN-A', reviewer: 'SYN-B' }).approved, true);
  assert.throws(() => approveConfiguration({ author: 'SYN-A', reviewer: '' }), /required/);
});

test('002-US2-AS1/2/4: catalog values are copied, unprorated, and version changes block', () => {
  const catalog = { version: '2027.1', benefits: { deductible: 50, maximum: 1000 } };
  const config = buildDentalConfiguration({ catalog, requestedVersion: '2027.1', effectiveOn: '2027-07-01' });
  assert.deepEqual(config.benefits, catalog.benefits);
  assert.equal(config.accumulators.deductibleUsed, 0);
  assert.equal(config.accumulators.annualMaximumUsed, 0);
  assert.equal(config.prorated, false);
  config.benefits.maximum = 1;
  assert.equal(catalog.benefits.maximum, 1000);
  assert.throws(() => buildDentalConfiguration({
    catalog, requestedVersion: 'old', effectiveOn: '2027-07-01'
  }), /Catalog changed/);
});

test('002-FR-012: go-live requires independent approval, vendor acceptance and all eight named results', () => {
  assert.equal(dentalReadiness(evidence()).ready, true);
  for (const change of [
    { configurationApproved: false }, { administratorAccepted: false }, { results: [] },
    { results: evidence().results.slice(1) },
    { results: Array(8).fill({ name: 'preventive', expected: 100, actual: 100 }) },
    { results: evidence().results.map((r, i) => i ? r : { ...r, actual: 101 }) },
    { results: evidence().results.map((r, i) => i ? r : { ...r, actual: undefined }) }
  ]) assert.equal(dentalReadiness({ ...evidence(), ...change }).ready, false);
});

test('004-US2-AS3: mid-year vision allowances and frequency limits start fresh', () => {
  const grid = { frames: 150, frequencyMonths: 12 };
  const config = buildVisionConfiguration({ benefitGrid: grid, effectiveOn: '2027-07-01' });
  assert.equal(config.allowanceUsed, 0);
  assert.equal(config.frequencyUsed, 0);
  assert.equal(config.startsOn, '2027-07-01');
  assert.equal(config.prorated, false);
  config.benefits.frames = 0;
  assert.equal(grid.frames, 150);
});

test('004-US5-AS2/3: waiting period delays coverage; termination cancels and notifies vendor', () => {
  const ready = {
    effectiveOn: '2027-07-01', medicalStartsOn: '2027-08-01',
    groupTerminated: false, evidence: evidence(VISION_TESTS)
  };
  assert.deepEqual(visionActivation(ready), { state: 'scheduled', startsOn: '2027-08-01' });
  assert.deepEqual(visionActivation({ ...ready, groupTerminated: true }), {
    state: 'cancelled', notifyAdministrator: true
  });
  assert.equal(visionActivation({ ...ready, evidence: evidence() }).state, 'blocked');
  assert.equal(visionActivation({
    ...ready, evidence: { ...evidence(VISION_TESTS), administratorAccepted: false }
  }).state, 'blocked');
});
