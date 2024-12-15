require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const connectDB = require('./server/config/db');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Configure session
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: 'sessions',
    }),
  })
);

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Middleware for parsing and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
// Connect to Database
connectDB();

// Static Files
app.use(express.static('public'));

// Templating Engine
app.use(expressLayouts);
app.set('layout', './layouts/main'); // Use the layout 'layouts/main.ejs'
app.set('view engine', 'ejs'); // Set the view engine to ejs

// Routes
app.use('/', require('./server/routes/auth'));
app.use('/', require('./server/routes/index'));
app.use('/', require('./server/routes/dashboard'));

// 401 Unauthorized Route
app.use('/unauthorized', (req, res) => {
  res.status(401).render('401', { title: 'Unauthorized' });
});

// Handle 404
app.get('*', (req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// Start the server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
