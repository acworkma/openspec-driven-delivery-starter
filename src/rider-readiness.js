import { dateOnly, daysBetween } from './dates.js';

export const DENTAL_TESTS = Object.freeze([
  'preventive', 'basic', 'major', 'waiting-period', 'annual-maximum',
  'out-of-network', 'dependent-child', 'terminated-member'
]);
export const VISION_TESTS = Object.freeze([
  'exam', 'lenses', 'frames', 'contacts', 'frequency-limit',
  'out-of-network', 'dependent-child', 'terminated-member'
]);

export function validateRiderRequest(request) {
  const { approvedOn, effectiveOn, groupActive, coverageEndsOn,
    compatible, exception = {} } = request;
  dateOnly(approvedOn, 'approvedOn');
  const effective = dateOnly(effectiveOn, 'effectiveOn');
  if (typeof groupActive !== 'boolean' || typeof compatible !== 'boolean') {
    throw new TypeError('groupActive and compatible must be booleans');
  }
  if (coverageEndsOn !== undefined) dateOnly(coverageEndsOn, 'coverageEndsOn');
  const errors = [];
  if (!groupActive || (coverageEndsOn !== undefined && coverageEndsOn < effectiveOn)) {
    errors.push('Group coverage must include the effective date');
  }
  if (!compatible) errors.push('Choose a compatible rider');
  if (effective.getUTCDate() !== 1) errors.push('Effective date must be the first of a month');
  if (daysBetween(approvedOn, effectiveOn) < 30
    && !(exception.productOwner === true && exception.underwriting === true
      && typeof exception.reason === 'string' && exception.reason.trim())) {
    errors.push('Short notice requires product owner and underwriting approval with a reason');
  }
  return { accepted: errors.length === 0, errors };
}

export function approveConfiguration({ author, reviewer }) {
  if (typeof author !== 'string' || !author.trim()
    || typeof reviewer !== 'string' || !reviewer.trim()) {
    throw new TypeError('Author and reviewer are required');
  }
  if (author === reviewer) throw new Error('A second configuration analyst must approve');
  return { approved: true, author, reviewer };
}

export function assessReadiness({ configurationApproved, administratorAccepted, results }, expectedNames) {
  const blockers = [];
  if (configurationApproved !== true) blockers.push('Configuration approval missing');
  if (administratorAccepted !== true) blockers.push('Administrator acceptance missing');
  if (!Array.isArray(results)) throw new TypeError('Claim results must be an array');
  const names = new Set(results.map((result) => result.name));
  if (results.length !== expectedNames.length || names.size !== expectedNames.length
    || expectedNames.some((name) => !names.has(name))) {
    blockers.push('Exactly the eight required claim results must be supplied');
  }
  if (results.some(({ expected, actual }) => !Number.isFinite(expected)
    || !Number.isFinite(actual) || expected !== actual)) {
    blockers.push('Every claim result must match its expected result');
  }
  return { ready: blockers.length === 0, blockers };
}
