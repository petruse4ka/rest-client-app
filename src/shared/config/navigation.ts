export const appRoutes = {
  home: '/',
  signIn: '/sign-in',
  signUp: '/sign-up',
  restClient: '/rest-client',
  history: '/history',
  variables: '/variables',
};

export const AUTH_ROUTES = [appRoutes.signIn, appRoutes.signUp];
export const PROTECTED_ROUTES = [appRoutes.history, appRoutes.variables, appRoutes.restClient];

export const navLinks = [
  { href: appRoutes.home, label: 'home' },
  { href: appRoutes.restClient, label: 'restClient' },
  { href: appRoutes.history, label: 'history' },
  { href: appRoutes.variables, label: 'variables' },
];

export const authLinks = [
  {
    href: appRoutes.signIn,
    label: 'signIn',
  },
  {
    href: appRoutes.signUp,
    label: 'signUp',
  },
];

export const authorLinks = [
  { href: 'https://github.com/petruse4ka', label: 'Konstantin Petrov' },
  { href: 'https://github.com/NatashaSolntseva', label: 'Nataliia Shmatenko' },
  { href: 'https://github.com/tearzday', label: 'Daniil Biver' },
];

export const courseLinks = [
  {
    href: 'https://rs.school/',
    label: 'courseLink',
  },
  {
    href: 'https://rs.school/docs/en',
    label: 'courseDocs',
  },
  {
    href: 'https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/final.md',
    label: 'courseTask',
  },
];
