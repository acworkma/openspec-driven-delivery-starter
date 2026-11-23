import assert from 'node:assert/strict';
import { Given, When, Then } from '@cucumber/cucumber';
import { listDependentClaims, findDependentClaim } from '../../src/claim-status.js';
import { approveConfiguration, validateRiderRequest, DENTAL_TESTS, VISION_TESTS } from '../../src/rider-readiness.js';
import { dentalReadiness } from '../../src/dental-rider.js';
import { triageDocument } from '../../src/document-triage.js';
import { buildVisionConfiguration, visionActivation } from '../../src/vision-rider.js';

const results = (names) => names.map((name) => ({ name, expected: 100, actual: 100 }));
const document = (overrides = {}) => ({
  type: 'claim-form', confidence: 0.96, memberIdMatches: true,
  dateOfBirthMatches: false, claimNumberMatches: true, conflictingIdentifiers: false,
  receivedAt: '2026-11-21T23:40:00Z', ...overrides
});

Given('a subscriber with a {int} year old dependent', function (age) {
  this.claimInput = { authenticated: true, subscriber: true, dependent: { age, confidential: false }, claims: [] };
});
Given('the dependent has a routine claim and a sensitive claim', function () {
  this.claimInput.claims = [
    { id: 'SYN-ROUTINE', status: 'Processed', billed: 100, planPaid: 80, sensitive: false },
    { id: 'SYN-SENSITIVE', status: 'Denied', billed: 900, planPaid: 0, sensitive: true }
  ];
});
Given('the dependent has a confidential communication request', function () {
  this.claimInput.dependent.confidential = true;
});
When("the subscriber lists the dependent's claims", function () {
  this.claimResponse = listDependentClaims(this.claimInput);
});
Then('only the routine claim is returned', function () {
  assert.deepEqual(this.claimResponse.claims.map((claim) => claim.id), ['SYN-ROUTINE']);
});
Then('removing the sensitive claim changes no response field', function () {
  assert.deepEqual(this.claimResponse, listDependentClaims({
    ...this.claimInput, claims: this.claimInput.claims.filter((claim) => !claim.sensitive)
  }));
});
Then('the response matches that for a child with no claims', function () {
  assert.deepEqual(this.claimResponse, listDependentClaims({
    ...this.claimInput, dependent: { age: 9, confidential: false }, claims: []
  }));
});
When('the subscriber requests the sensitive claim directly', function () {
  this.claimResponse = findDependentClaim(this.claimInput, 'SYN-SENSITIVE');
});
Then('the result matches a nonexistent claim', function () {
  assert.deepEqual(this.claimResponse, findDependentClaim(this.claimInput, 'SYN-MISSING'));
  assert.equal(this.claimResponse.status, 404);
});
Then('the adult privacy message is independent of claims', function () {
  assert.deepEqual(this.claimResponse, listDependentClaims({ ...this.claimInput, claims: [] }));
  assert.match(this.claimResponse.message, /private/);
});

Given('a dental package built by {string}', function (author) { this.author = author; });
When('{string} attempts configuration approval', function (reviewer) {
  this.approvalAttempt = () => approveConfiguration({ author: this.author, reviewer });
});
Then('configuration approval is refused', function () {
  assert.throws(this.approvalAttempt, /second configuration analyst/);
});
Given('an independently approved dental package with administrator acceptance', function () {
  this.dentalEvidence = { configurationApproved: true, administratorAccepted: true, results: [] };
});
Given('all eight dental test claims match', function () {
  this.dentalEvidence.results = results(DENTAL_TESTS);
});
Given('the annual maximum test pays too much', function () {
  this.dentalEvidence.results.find((result) => result.name === 'annual-maximum').actual = 101;
});
When('dental readiness is evaluated', function () { this.readiness = dentalReadiness(this.dentalEvidence); });
Then('the dental request is ready', function () { assert.equal(this.readiness.ready, true); });
Then('the dental request is blocked', function () { assert.equal(this.readiness.ready, false); });
Given('a rider approved on {string} and effective on {string}', function (approvedOn, effectiveOn) {
  this.riderRequest = { approvedOn, effectiveOn, groupActive: true, compatible: true };
});
When('the rider request is validated without exception approvals', function () {
  this.validation = validateRiderRequest(this.riderRequest);
});
Then('the request needs product owner and underwriting approval', function () {
  assert.equal(this.validation.accepted, false);
  assert.match(this.validation.errors.join(' '), /product owner and underwriting/);
});

Given('a synthetic claim form classified at {float}', function (confidence) {
  this.document = document({ confidence });
});
Given('the identifiers point to different members', function () {
  this.document.conflictingIdentifiers = true;
});
Given('its weekly misroute rate is {float}', function (misrouteRate) { this.document.misrouteRate = misrouteRate; });
Given('an expedited appeal received at {string}', function (receivedAt) {
  this.document = document({ type: 'appeal-or-grievance', receivedAt, expedited: true });
});
When('document triage runs', function () { this.triage = triageDocument(this.document); });
Then('the document queue is {string}', function (queue) { assert.equal(this.triage.queue, queue); });
Then('the document remains unattached', function () { assert.equal(this.triage.attachment, 'unattached'); });
Then('automatic routing is paused', function () { assert.equal(this.triage.autoRoutingPaused, true); });
Then('its deadline clock starts at {string}', function (receivedAt) {
  assert.equal(this.triage.clockStartsAt, receivedAt);
  assert.equal(this.triage.priority, 'expedited');
});

Given('a vision rider effective on {string}', function (effectiveOn) { this.effectiveOn = effectiveOn; });
When('the vision benefit grid is configured', function () {
  this.visionConfiguration = buildVisionConfiguration({
    benefitGrid: { frameAllowance: 150, frequencyMonths: 12 }, effectiveOn: this.effectiveOn
  });
});
Then('allowances and frequency usage start at zero without proration', function () {
  assert.equal(this.visionConfiguration.allowanceUsed, 0);
  assert.equal(this.visionConfiguration.frequencyUsed, 0);
  assert.equal(this.visionConfiguration.prorated, false);
  assert.equal(this.visionConfiguration.benefits.frameAllowance, 150);
});
Given('a ready vision rider effective on {string}', function (effectiveOn) {
  this.visionInput = {
    effectiveOn, medicalStartsOn: effectiveOn, groupTerminated: false,
    evidence: { configurationApproved: true, administratorAccepted: true, results: results(VISION_TESTS) }
  };
});
Given('medical coverage starts on {string}', function (medicalStartsOn) { this.visionInput.medicalStartsOn = medicalStartsOn; });
Given('the group terminates before go-live', function () { this.visionInput.groupTerminated = true; });
When('vision activation is scheduled', function () { this.activation = visionActivation(this.visionInput); });
Then('vision coverage starts on {string}', function (startsOn) { assert.equal(this.activation.startsOn, startsOn); });
Then('the vision request is cancelled with administrator notification requested', function () {
  assert.deepEqual(this.activation, { state: 'cancelled', notifyAdministrator: true });
});
