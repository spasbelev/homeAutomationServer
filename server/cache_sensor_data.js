const getSensorReadings = require('./read_dht22_sensor')
const databaseOperation = require('./database-operations')


const {notifier} = require('./notifier')

const cache = 
	{
		temperature: null,
		humidity: null
	}

setInterval(() => {
	getSensorReadings((err, temperature, humidity) => {
		if(err){
			return console.error(err)
		}
		databaseOperations.insertReading('temperature', temperature)
		databaseOperations.insertReading('humidity', humidity)

		if(cahce.temperature != temperature) {
			notify(temperature, 'temperature')
		}
		if(cache.humidity != humidity) {
			notify(humidity, 'humidity')
		}
		cache.temperature = temperature
		cache.humidity = humidity
	})
}, 2000)

module.exports.getTemperature = () => cache.temperature
module.exports.getHumidity = () => cache.humid
ity
