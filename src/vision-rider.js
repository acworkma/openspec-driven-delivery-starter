import { dateOnly } from './dates.js';
import { assessReadiness, VISION_TESTS } from './rider-readiness.js';

export function buildVisionConfiguration({ benefitGrid, effectiveOn }) {
  dateOnly(effectiveOn, 'effectiveOn');
  if (!benefitGrid || typeof benefitGrid !== 'object' || Array.isArray(benefitGrid)) {
    throw new TypeError('A benefit grid is required');
  }
  return {
    benefits: structuredClone(benefitGrid),
    allowanceUsed: 0, frequencyUsed: 0, startsOn: effectiveOn, prorated: false
  };
}

export function visionActivation({ effectiveOn, medicalStartsOn, groupTerminated, evidence }) {
  dateOnly(effectiveOn, 'effectiveOn');
  dateOnly(medicalStartsOn, 'medicalStartsOn');
  if (typeof groupTerminated !== 'boolean') throw new TypeError('groupTerminated must be a boolean');
  if (groupTerminated) return { state: 'cancelled', notifyAdministrator: true };
  const readiness = assessReadiness(evidence, VISION_TESTS);
  if (!readiness.ready) return { state: 'blocked', blockers: readiness.blockers };
  return {
    state: 'scheduled', startsOn: medicalStartsOn > effectiveOn ? medicalStartsOn : effectiveOn
  };
}
