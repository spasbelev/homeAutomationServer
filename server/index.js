const express = require('express')
const path = require('path')
const app = express()
const getCachedSensorReadings = require('./cache_sensor_data')

app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/temperature', function(req, res) {
	res.json ({
		value:
		getCachedSensorReadings.getTemperature().toFixed(1)
	})
})

app.get('/humidity', function(req, res) {
	res.json({
		value:
		getCachedSensorReadings.getHumidity().toFixed(1)
	})
})

app.listen(3000, function(){
	console.log('Server listening on port 3000');
})


