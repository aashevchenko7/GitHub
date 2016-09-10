var express = require('express');
var https = require('https');
var fs = require('fs');
var queryString = require('querystring');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var jade = require('jade');
var session = require('express-session');
//  .......
var errorHandler = require('errorhandler');
var cookieParser = require('cookie-parser');
var request = require('request');
//var MongoStore = require('connect-mongo')(session);
//  .......
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var options = {
    ca: [fs.readFileSync('./cert.crt'), fs.readFileSync('./cert.crt')],
    cert: fs.readFileSync('./cert.crt'),
    key: fs.readFileSync('./pkey.key')
};

app = express();

//  .......
app.locals.pretty = true;
//app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/app/server/views');
app.set('view engine', 'jade');
//  .......

var dbHost = process.env.DB_HOST || 'localhost'
var dbPort = process.env.DB_PORT || 27017;
var dbName = process.env.DB_NAME || 'node-login';
//  mongodb://localhost/apiDB"
var dbURL = 'mongodb://'+dbHost+':'+dbPort+'/'+dbName;


/*app.use(session({
        proxy: true,
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({ url: dbURL })
    })
);*/


app.use(function(req, res, next){
    next();
});
/*
//	app.use(express.static(__dirname+'/public'));
//	app.use(bodyParser.urlencoded({extended:true}));
//  .......
//    app.use(express.bodyParser());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
*/
app.use(express.static(__dirname + '/app/public'));
/*
// build mongo database connection url //

if (app.get('env') == 'live'){
    // prepend url with authentication credentials //
    dbURL = 'mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+'@'+dbHost+':'+dbPort+'/'+dbName;
}
*/


var livechat = require('./app/server/routes/livechat');


app.use('/livechat', livechat);

var server = https.createServer(options, app);


server.listen(3000, function(){
    console.log("server running.")
});

var io = require('socket.io').listen(server);
io.set();

io.sockets.on('connection',function(socket){
    console.log('user connected');
    socket.on('message',function(text,cb){
        console.log('user message');




        //socket.broadcast.emit('message',JSON.stringify(answer));
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});
