/**
 * Created by hanso on 10/30/2018.
 */
var express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  sequelize = require('sequelize'),
  passport = require('passport'),
  jwt = require('jsonwebtoken'),
  path = require('path'),
  cors = require('cors'),
  path = require('path');

// App related modules.
var hookJWTStrategy = require('./server/passportStrategy');

// Initializations.
var app = express();

// Parse as urlencoded and json |Hook up Passport..|Hook up the HTTP logger.|Hook the passport JWT strategy.
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use(passport.initialize());

hookJWTStrategy(passport);
// app.all('*',function (req,res,next){
//     console.log(req.header("Authorization"));
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization ,Accept');
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Credentials',true);
//     res.setHeader('Access-Control-Expose-Headers','Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

//     console.log(req.header("Authorization"));
//     next();
// });
// Set the static files location.
// Serve static files
// Set the static files location.
// app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, '/angular')));
app.use('/api', require('./server/routes/api')(passport)); // Bundle API routes.

// Catch all route.
// Return other routes to Angular index file..
app.get('*', (req, res) => {
  // res.sendFile(path.join(__dirname, ''));
  var msg = "<em>Welcome, .... Cloud Africa Value Added Service :)</em>";
  res.send(msg);
});

// Start the server.
app.listen('3000', function () {
  console.log(`Magic happens at http://localhost:3000`);
});