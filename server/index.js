const express = require('express');
const path = require('path');
const app = express();

const getCachedSensorReadings = require('./cache_sensor_data');
const databaseOperations = require('./database-operations');
const https = require('https');
const socketIo = require('socket.io');
const {subscribe, unsubscribe} = require('./notifier');
const loginValidate = require("./login/loginValidate");

if (process.env.NODE_ENV !== 'production') {
    var selfSigned = require('openssl-self-signed-certificate');
 
    var options = {
        key: selfSigned.key,
        cert: selfSigned.cert
    };
 
    var httpsServer = https.createServer(options, app).listen(3000);
    console.log(`HTTPS started on port ${3000} (dev only).`);
}
var bodyParser = require('body-parser');
var fs = require('fs');


// Redirect to https for Heroku deployment
function requireHTTPS(req, res, next) {
	// The 'x-forwarded-proto' check is for Heroku
	if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
	  return res.redirect('https://' + req.get('host') + req.url);
	}
	next();
  }
const io = socketIo(httpsServer);

app.use(requireHTTPS);

app.use(bodyParser.json());

io.on('connection', socket => {
	console.log("User connected [${socket.id}]")


const pushTemperature = newTemperature => {
	socket.emit('new-temperature', {
		value: newTemperature
	})
}

const pushHumidity = newHumidity => {
	socket.emit('new-humidity', {
		value: newHumidity
	})
}

subscribe(pushTemperature, 'temperature')
subscribe(pushHumidity, 'humidity')

socket.on('disconnect', () => {
	unsubscribe(pushTemperature, 'temperature')
	unsubscribe(pushHumidity, 'humidity')
	})
})



app.get("/", function(req, res) {
	if(!loginValidate.wasLoginSuccessful()) {
		res.redirect("/login")
	} else {
		res.redirect("./public/mainScreen/");
	}
})


app.use('/login', express.static(path.join(__dirname, 'login')))

app.use("/public/mainScreen", express.static(path.join(__dirname, 'public/mainScreen')));

app.get("/public/mainScreen/", function(req, res) {
	res.sendFile( __dirname + "/public/" + "mainScreen/" + "mainPage.html" );
})

app.post('/login', function(req, res, next) {
	if(loginValidate.wasLoginSuccessful()) {
		res.redirect("/login")
	} else {
		res.redirect("./public/mainScreen/");
	}
})
// var routes = require('./router/router');
// app.use('/', routes);

app.use(function(req, res, next){
	if(!req.secure) {
		return res.redirect(['https://', req.get('Host'), req.url].join(''));
	  }
	  next();
})

