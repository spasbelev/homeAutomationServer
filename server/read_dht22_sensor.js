const sensor = require('node-dht-sensor')

const getSensorReadings = (callback) => {
	sensor.read(22, 21, function (err, temperature, humidity){
		if(err){
			return callback(err)
		}
		/*Signify that there is no error by reutrning as first
		 * parameter to callback null.*/
		callback(null, temperature, humidity)
	})
}

module.exports = getSensorReadings
