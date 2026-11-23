import { assessReadiness, DENTAL_TESTS } from './rider-readiness.js';
import { dateOnly } from './dates.js';

export function buildDentalConfiguration({ catalog, requestedVersion, effectiveOn }) {
  dateOnly(effectiveOn, 'effectiveOn');
  if (!catalog || typeof catalog.version !== 'string' || !catalog.benefits) {
    throw new TypeError('A versioned benefit catalog is required');
  }
  if (catalog.retired === true) throw new Error('A retired rider cannot be configured');
  if (catalog.version !== requestedVersion) {
    throw new Error('Catalog changed: revalidate and obtain product owner approval');
  }
  return {
    version: catalog.version,
    benefits: structuredClone(catalog.benefits),
    accumulators: { deductibleUsed: 0, annualMaximumUsed: 0, startsOn: effectiveOn },
    prorated: false
  };
}

export function dentalReadiness(evidence) {
  return assessReadiness(evidence, DENTAL_TESTS);
}
