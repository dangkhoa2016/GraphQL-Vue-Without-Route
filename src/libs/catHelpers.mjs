export const calculateAge = (cat) => {
  if (!cat) {
    return null;
  }

  const { birthday } = cat;
  if (!birthday) {
    return null;
  }

  const now = new Date();
  const birthDate = new Date(Number(birthday));
  let age = now.getFullYear() - birthDate.getFullYear();
  const month = now.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && now.getDate() < birthDate.getDate()))
    age = age - 1;

  return `${age} year${age === 1 ? '' : 's'} old`;
}

export const defaultImage = 'https://placehold.co/400?text=Avatar';

const bootstrapColors = [
  '--bs-light-border-subtle',
  '--bs-light-bg-subtle',
  '--bs-dark-border-subtle',
  '--bs-dark-bg-subtle',
  '--bs-success-border-subtle',
  '--bs-success-bg-subtle',
  '--bs-danger-border-subtle',
  '--bs-danger-bg-subtle',
  '--bs-warning-border-subtle',
  '--bs-warning-bg-subtle',
  '--bs-info-border-subtle',
  '--bs-info-bg-subtle',
  '--bs-primary-border-subtle',
  '--bs-primary-bg-subtle',
];

export const randomBgColor = () => {
  return bootstrapColors[Math.floor(Math.random() * bootstrapColors.length)];
};
