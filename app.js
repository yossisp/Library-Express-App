const express = require('express');
const debug = require('debug')('app');
const chalk = require('chalk');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const initClient = require('./src/db.js');
const constants = require('./src/config/constants.js');
const bookRouter = require('./src/routes/bookRoutes.js');
const adminRouter = require('./src/routes/adminRoutes.js');
const passportSettings = require('./src/config/passport.js');
const authRouter = require('./src/routes/authRoutes.js');

const app = express();

// middleware
app.use(morgan(constants.MORGAN_MODE));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: constants.SESSION_SECRET }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

async function initializeApp() {
  const nav = constants.NAVIGATION;
  const client = await initClient();
  // client var is wrapped in an object so that all routes have the reference
  // to the client. Thus closing the client and re-opening the client in different routes
  // will still expose the same client to all routes.
  const dbConnection = { client };
  debug('Connected to server');

  app.get(constants.ROUTES.ROOT, (req, res) => {
    res.render(constants.VIEWS.INDEX, {
      nav,
      title: constants.TITLES.WELCOME,
      username: constants.VIEWS.USERNAME_INPUT_FORM,
      password: constants.VIEWS.PASSWORD_INPUT_FORM,
      signInRoute: constants.ROUTES.AUTH_SIGNIN,
      signUpRoute: constants.ROUTES.AUTH_SIGNUP
    });
  });
  passportSettings(app, dbConnection);
  app.use(constants.ROUTES.BOOKS, bookRouter(nav, dbConnection));
  app.use(constants.ROUTES.ADMIN, adminRouter(dbConnection));
  app.use(constants.ROUTES.AUTH, authRouter(nav, dbConnection));

  app.listen(constants.PORT, () => {
    debug(`listening on port ${chalk.green(constants.PORT)}`);
  });
}

initializeApp()
  .catch(err => debug(err));

