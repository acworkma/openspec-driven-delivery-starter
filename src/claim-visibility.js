export function canViewDependentClaim({ age, confidential, sensitive }) {
  if (!Number.isInteger(age) || age < 0 || typeof confidential !== 'boolean'
    || typeof sensitive !== 'boolean') return false;
  return !confidential && age < 18 && (age < 13 || !sensitive);
}
