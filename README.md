# Library-Express-Website

### Node.js app which handles routes for Library website. The website displays a list of books. 

### Flow:

The website is still not in its final stage, therefore the look and feel are very basic. The website uses Mongodb and I couldn't find any free Mongodb integrations with Heroku therefore the website can be run only on `localhost`. Also the website requires a local running instance of Mongodb. The user can register and login at `'/'` route. If login is unsuccessful the user is redirected to root.

Upon login the user is taken to the profile which is currently empty. Then the user can click on `BOOKS` link on top to see the list of books. Each book has `Read more` link which will display more information about the book (the information will be taken from Goodreads API). 

Initially the `BOOKS` section is empty. In order to add books `/admin` route must be used. In the future this route will be used by some of sort admin entity to update the library but currently the route can be accessed by the user.

The user may log out at any time.

Authentication is done using `Passport.js` local strategy via cookies. Password encryption is done using `bcrypt` npm package (including salting). `Morgan` npm package is used for logs. `npm run mydebug` option enables debug statements but requires global installation of `nodemon` (`nodemon` can be removed from `mydebug` in `package.json`). The template engine used in the project is `EJS`. Bootstrap theme is used for the look and feel of the website. `Axios` is used in order to connect to [Goodreads API](https://www.goodreads.com/api/index#book.show). I'm using my own middleware in order to check login status upon each HTTP requests to a route.

This is the project structure:

```
.
├── README.md
├── app.js
├── package-lock.json
├── package.json
├── public
│   ├── css
│   │   ├── bootstrap.min.css
│   │   └── styles.css
│   ├── img
│   │   └── book.jpg
│   └── js
│       ├── bootstrap.min.js
│       └── jquery.min.js
└── src
    ├── config
    │   ├── constants.js
    │   ├── passport.js
    │   └── strategies
    │       └── local.strategy.js
    ├── controllers
    │   ├── authController.js
    │   └── bookController.js
    ├── db.js
    ├── middleware
    │   └── middleware.js
    ├── routes
    │   ├── adminRoutes.js
    │   ├── authRoutes.js
    │   └── bookRoutes.js
    ├── services
    │   └── goodreadsService.js
    └── views
        ├── bookListView.ejs
        ├── bookView.ejs
        ├── index.ejs
        ├── profile.ejs
        └── signin.ejs