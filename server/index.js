const express = require('express');
const path = require('path');
const app = express();
const getCachedSensorReadings = require('./cache_sensor_data');
const databaseOperations = require('./database-operations');
const https = require('https');
const socketIo = require('socket.io');
const {subscribe, unsubscribe} = require('./notifier');
const loginValidate = require("./login/loginValidate");
var fs = require('fs');

var key = fs.readFileSync('encryption/private.key');
var cert = fs.readFileSync( 'encryption/primary.crt' );
var ca = fs.readFileSync( 'encryption/intermediate.crt' );

var options = {
	key: key,
	cert: cert,
	ca: ca
  };

const httpsServer = https.Server(app)

const io = socketIo(httpsServer)

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
httpsServer.listen(3000,'192.168.0.100', function () {
	console.log(httpsServer.address().address)
	console.log('Server listening on port 3000')
})

app.use('/login', express.static(path.join(__dirname, 'login')))

//app.use('/public/mainScreen', express.static(path.join(__dirname, 'public/mainScreen')))

app.post('/login', function(req, res, next) {
	if(validateLogin()) {
		res.redirect("/login")
	} else {
		res.redirect("./public/mainScreen/mainPage.html");
	}
})
