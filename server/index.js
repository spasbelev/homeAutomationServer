const express = require('express')
const path = require('path')
const app = express()
const getCachedSensorReadings = require('./cache_sensor_data')
const databaseOperations = require('./database-operations')

app.get('/temperature/history',function(req, res) {
	databaseOperations.fetchLatestReading('temperature', 10, (err, result) => {
if(err) {
	console.error(err)
	return res.status(500).end()	
}
	res.json(result.reverse())
	})
})

app.get('/humidity/history', function(req, res) {
	databaseOperations.fetchLatestReading('humidity', 10, (err, result) => {
		if(err) {
			console.error(err)
			return res.status(500).end()
		}
		res.json(result.reverse())
	})
})

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


