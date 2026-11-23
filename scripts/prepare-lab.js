import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const learnerPolicy = `export function canViewDependentClaim({ age, confidential, sensitive }) {
  throw new Error('Implement the approved 001 dependent-visibility rules');
}
`;

export function prepareLab(destination) {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  const target = resolve(destination);
  const relativeTarget = relative(root, target);
  if (!relativeTarget || (!relativeTarget.startsWith(`..${sep}`)
    && relativeTarget !== '..' && !relativeTarget.startsWith(`context${sep}`))) {
    throw new Error('Inside this repository, put learner copies under context');
  }
  if (existsSync(target)) throw new Error('Destination already exists; choose a fresh learner directory');
  mkdirSync(target, { recursive: true });
  for (const name of [
    'package.json', 'package-lock.json', '.gitignore', '.github', '.azuredevops', 'pipelines',
    'src', 'tests', 'features', 'openspec', 'scripts', 'workshop', 'docs', 'README.md',
    'LICENSE'
  ]) cpSync(join(root, name), join(target, name), { recursive: true });
  writeFileSync(join(target, 'src', 'claim-visibility.js'), learnerPolicy, 'utf8');
  writeFileSync(join(target, 'openspec', 'changes', 'implement-dependent-privacy', 'tasks.md'),
    '# Learner tasks\n\n'
    + '- [ ] Record actual human approval of the bounded behavior and plan before implementation.\n'
    + '- [ ] Implement the visibility policy in src/claim-visibility.js.\n'
    + '- [ ] Run targeted checks, npm run check and the dependency audit.\n'
    + '- [ ] Attach independent PR review evidence after the checks pass.\n', 'utf8');
  return target;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    console.log(`Learner copy: ${prepareLab(process.argv[2] ?? 'context/lab-001')}`);
    console.log('Initialize a new sandbox Git repository there; install with npm ci. The 001 tests should fail until implemented.');
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
