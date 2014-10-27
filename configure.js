
'use strict';

var
  views_dir       = __dirname + '/views',
  express         = require('express'),
  jade_browser    = require('jade-browser'),
  passport        = require('passport'),
  _               = require('underscore'),
  session         = require('express-session'),
  redis_store     = require('connect-redis')(session),
  body_parser     = require('body-parser'),
  fs              = require('fs'),
  env             = process.env.NODE_ENV || 'development';

module.exports = function(app, config) {

  if (env == 'development') {
    app.use(express.static('public'));
  }
  
  /* Globals, so that mounted routers have access to these resources */
  global.db       = require('./db')(config.db_name);
  global.passport = require('./auth');

  require('./view_helpers')(app);
  require('./marked')(app);

  app.set('view engine', 'jade');
  app.set('views', config.view_dir);
  app.set('view cache', (env == 'production'));
  app.use(body_parser.urlencoded({ extended: true }));
  app.use(body_parser.json({ extended: true }));
  app.use(require('cookie-parser')());
  app.use(session({
    store: new redis_store,
    secret: 'hot~dog',
    proxy: true,
    cookie: { secure: (env == 'production') },
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(require('csurf')());
  app.locals.pretty = true;
  app.locals._ = _;
  app.use(function(req, res, next) {
    res.locals.csrf = req.csrfToken();
    if (req.isAuthenticated()) {
      res.locals.user = _.omit(req.user, [ 'password', '__v' ]);
      // Disable caching if logged in
      res.setHeader('Cache-Control', 'no-cache');
    } else {
      delete res.locals.user;
    }
    next();
  });

  var jade_paths = [ 'cms/*.jade' ];

  app.use(jade_browser(
    '/jade.js',
    jade_paths.concat(config.jade_paths),
    { root: app.get('views'), minify: (env == 'production') }
  ));

};

