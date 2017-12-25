const express = require('express');
const path = require('path');
const app = express();

const getCachedSensorReadings = require('./cache_sensor_data');
const databaseOperations = require('./database-operations');
const https = require('https');
var http = require('http');
const socketIo = require('socket.io');
const {subscribe, unsubscribe} = require('./notifier');
const loginValidate = require("./login/loginValidate");

const httpServer = http.Server(app);
const io = socketIo(httpServer);

var bodyParser = require('body-parser');
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

httpServer.listen(3000, function () {
	console.log('Server listening on port 3000')
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

app.use(function(req, res){
	res.status(404).send("Page not found");
})
