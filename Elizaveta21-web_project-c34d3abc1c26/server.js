
// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 2121;        // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://Sherry:1234@ds141401.mlab.com:41401/mydbforcolumn'); // connect to our database

var Column = require('./app/js/columns');

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/columns')

    // create a bear (accessed at POST)
    .post(function(req, res) {

        var column = new Column();
        column.name = req.body.name;
        column.text = req.body.text;
        column.fullText = req.body.fullText;

        column.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Column created!' });
        });
    })

    .get(function(req, res) {
        Column.find(function(err, columns) {
            if (err)
                res.send(err);

            res.json(columns);
        });
    });


router.route('/columns/:column_id')

   .get(function(req, res) {
       Column.findById(req.params.column_id, function(err, column) {
           if (err)
               res.send(err);
           res.json(column);
       });
   })

   .put(function(req, res) {
      Column.findById(req.params.column_id, function(err, column) {
          if (err)
              res.send(err);

          column.name = req.body.name;
          column.text = req.body.text;
          column.fullText = req.body.fullText;

          column.save(function(err) {
              if (err)
                  res.send(err);

              res.json({ message: 'Column updated!' });
          });
      });
  })

  .delete(function(req, res) {
        Column.remove({
            _id: req.params.column_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });




// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
