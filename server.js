// Babel ES6/JSX Compiler
require('babel-register');

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');
var favicon = require('serve-favicon');
var logger = require('morgan');
var async = require('async');
var colors = require('colors');
var mongoose = require('mongoose');
var request = require('request');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var swig  = require('swig');
var xml2js = require('xml2js');
var _ = require('underscore');

var config = require('./config');
var routes = require('./app/routes');
var Guitar = require('./models/guitar');

var app = express();

mongoose.connect(config.database);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});

app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/img',express.static(__dirname + "/public/img"));


/**
 * GET /api/guitars
 * Returns 2 random guitars 
 */
app.get('/api/guitars', function(req, res, next) {

  Guitar.find({ random: { $near: [Math.random(), 0] } })
    .limit(2)
    .exec(function(err, guitars) {
      if (err) return next(err);
      return res.send(guitars);
    
    });

});


/**
 * PUT /api/guitars
 * Update winning and losing count for both guitars.
 */
app.put('/api/guitars', function(req, res, next) {
  var winner = req.body.winner;
  var loser = req.body.loser;
  

  async.parallel([
      function(callback) {
        Guitar.findOne({ guitarId: winner }, function(err, winner) {
          callback(err, winner);
        });
      },
      function(callback) {
        Guitar.findOne({ guitarId: loser }, function(err, loser) {
          callback(err, loser);
        });
      }
    ],function(err, results) {
      if (err) return next(err);

      var winner = results[0];
      var loser = results[1];

      async.parallel([
        function(callback) {
          winner.wins++;
          winner.random = [Math.random(), 0];
          winner.save(function(err) {
            callback(err);
          });
        },
        function(callback) {
          loser.losses++;
          loser.random = [Math.random(), 0];
          loser.save(function(err) {
            callback(err);
          });
        }
      ], function(err) {
        if (err) return next(err);
        res.status(200).end();
      });
      
    }
  );

});

/**
 * GET /api/guitars/search
 * Looks up a guitar by model. (case-insensitive)
 */
app.get('/api/guitars/search', function(req, res, next) {
  var guitarName = new RegExp(req.query.model, 'i');

  Guitar.findOne({ model: guitarName }, function(err, guitar) {
    
    if (err) return next(err);

    if (!guitar) {
      return res.status(404).send({ message: 'Guitar not found.' });
    }

    res.send(guitar);
  });
});


/**
 * GET /api/guitars/top
 * Returns top guitars
 */
app.get('/api/guitars/top', function(req, res, next) {

  Guitar
    .find()
    .sort('-wins')
    .limit(20)
    .exec(function(err, guitars) {
      if (err) return next(err);

      res.send(guitars);
    });

});


/**
 * GET /api/guitars/:id
 * Returns detailed guitar information.
 */

app.get('/api/guitars/:id', function(req, res, next) {
  var id = req.params.id;

  Guitar.findOne({ guitarId: id }, function(err, guitar) {
    if (err) return next(err);

    if (!guitar) {
      return res.status(404).send({ message: 'Guitar not found.' });
    }

    res.send(guitar);
  });
});


app.post('/api/guitars', function(req, res, next) {
  var brand = req.body.brand;
  var model = req.body.model;
  var picture = req.body.picture;

  Guitar.count({}, function(err, count) {
    if (err) return next(err);

    var guitarId = count + 1;

    var guitar = new Guitar({
              guitarId: guitarId,
              brand: brand,
              model: model,
              picture: picture,
              wins: 0,
              losses: 0,
              random: [Math.random(), 0]
            });
    guitar.save(function(err) {
              if (err) return next(err);
              res.send({ message: brand + ' ' +model+ ' has been added successfully!' });
            });
  });
  
});

/**
 * GET /api/stats
 * Returns guitar statistics.
 */
app.get('/api/stats', function(req, res, next) {
  async.parallel([
      function(callback) {
        Guitar.count({}, function(err, count) {
          callback(err, count);
        });
      },
      function(callback) {
        Guitar.count({ brand: 'Fender' }, function(err, fenderCount) {
          callback(err, fenderCount);
        });
      },
      function(callback) {
        Guitar.count({ brand: 'Gibson' }, function(err, gibsonCount) {
          callback(err, gibsonCount);
        });
      },
      function(callback) {
        Guitar.count({ model: 'Acoustic' }, function(err, acousticCount) {
          callback(err, acousticCount);
        });
      },
      function(callback) {
        Guitar.aggregate({ $group: { _id: null, total: { $sum: '$wins' } } }, function(err, totalVotes) {
            var total = totalVotes.length ? totalVotes[0].total : 0;
            callback(err, total);
          }
        );
      },
      function(callback) {
        Guitar.find({},'brand model',{sort:{wins:-1},limit:1}, function(err, coolestGuitar) {
          var cGuitar =coolestGuitar[0]['brand']+ ' '+ coolestGuitar[0]['model'];
          callback(err, cGuitar);
        });
      },
      function(callback) {
        Guitar.aggregate({ $group: { _id: {brand:"$brand"}, total: { $sum: '$wins' } } }, function(err, totalVotesPerGuitar) {
            totalVotesGibson = totalVotesPerGuitar[0]['total'];
            callback(err, totalVotesGibson);
          }
        );
      },
      function(callback) {
        Guitar.aggregate({ $group: { _id: {brand:"$brand"}, total: { $sum: '$wins' } } }, function(err, totalVotesPerGuitar) {
            totalVotesFender = totalVotesPerGuitar[1]['total'];
            callback(err, totalVotesFender);
          }
        );
      },
      function(callback) {
        Guitar.aggregate({ $group: { _id: {model:"$model"}, total: { $sum: '$wins' } } }, function(err, totalVotesPerGuitar) {
            if (typeof a != "undefined") {
              totalVotesAcoustic = totalVotesPerGuitar[11]['total'];    
            }
            else{
              totalVotesAcoustic = 0;
            }
            
            callback(err, totalVotesAcoustic);
          }
        );
      }
    ],
    function(err, results) {
      if (err) return next(err);

      res.send({
        totalCount: results[0],
        fenderCount: results[1],
        gibsonCount: results[2],
        acousticCount: results[3],
        totalVotes: results[4],
        coolestGuitar: results[5],
        totalVotesGibson: results[6],
        totalVotesFender: results[7],
        totalVotesAcoustic: results[8],
      });
    });
});

app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
        var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
        var page = swig.renderFile('views/index.html', { html: html });
        res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

app.use(function(err, req, res, next) {
  console.log(err.stack.red);
  res.status(err.status || 500);
  res.send({ message: err.message });
});

/**
 * Socket.io stuff.
 */
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var onlineUsers = 0;

io.sockets.on('connection', function(socket) {
  onlineUsers++;

  io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });

  socket.on('disconnect', function() {
    onlineUsers--;
    io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
  });
});

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
