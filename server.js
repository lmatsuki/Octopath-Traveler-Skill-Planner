//Server.js, don't forget to add express & ejs to packages
var app = require('express')(),
    http_instance;

const port = process.env.PORT || 80
const router = express.Router()

app.use(express.static(`${__dirname}/dist`)) // set the static files location for the static html

app.engine('.html', require('ejs').renderFile)

app.set('views', `${__dirname}/dist`)

router.get('/*', (req, res, next) => {
  res.sendFile(`${__dirname}/dist/index.html`)
})

app.use('/', router)

app.get('/', function( req, res ){  
    setTimeout( function(){ 
      res.send( 'all done!' ); 
    }, 10000 );
  });

// when shutdown signal is received, do graceful shutdown
process.on( 'SIGINT', function(){
    http_instance.close( function(){
      console.log( 'gracefully shutting down :)' );
      process.exit();
    });
  });

var server = app.listen(port)

console.log('App running on port', port)

// listen for an event
var handler = function() {
    server.close();
  };