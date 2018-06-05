const constants = {
  DB_COLLECTIONS: {
    USERS: 'users',
    BOOKS: 'books'
  },
  DB_NAME: 'libraryApp',
  MONGODB_URL: 'mongodb://localhost:27017',
  WELCOME_MESSAGE: 'Welcome to your account',
  PASSPORT_STRATEGY_TYPE: 'local',
  SESSION_SECRET: 'Abcdefg#*%$!12',
  MORGAN_MODE: 'tiny',
  SALT_ROUNDS: 10,
  EMPTY_STR: '',
  PORT: process.env.PORT || 3000,
  VIEWS: {
    USERNAME_INPUT_FORM: 'username',
    PASSWORD_INPUT_FORM: 'password',
    INDEX: 'index',
    BOOK_LIST_VIEW: 'bookListView',
    BOOK_VIEW: 'bookView',
    SIGNIN: 'signin',
    PROFILE: 'profile'
  },
  TITLES: {
    SIGNIN: 'Sign In',
    MY_ACCOUNT: 'My Account',
    MY_LIBRARY: 'My Library',
    BOOK: 'Book',
    WELCOME: 'Welcome to my site'
  },
  ROUTES: {
    AUTH_SIGNIN: '/auth/signin',
    AUTH_SIGNUP: '/auth/signUp',
    AUTH_PROFILE: '/auth/profile',
    AUTH_LOGOUT: '/auth/logout',
    AUTH_SUCCESS_REDIRECT: '/auth/profile',
    ROOT: '/',
    SIGNIN: '/signin',
    SIGNUP: '/signUp',
    PROFILE: '/profile',
    LOGOUT: '/logout',
    BOOKS: '/books',
    ADMIN: '/admin',
    AUTH: '/auth'
  }
};

constants.NAVIGATION = [
  { link: constants.ROUTES.AUTH_PROFILE, title: 'My Profile' },
  { link: constants.ROUTES.BOOKS, title: 'Books' },
  { link: constants.ROUTES.AUTH_LOGOUT, title: 'Logout' }
];

module.exports = constants;
