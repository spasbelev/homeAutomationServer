
const fetchTemperature = () => {
fetch('/temperature')
.then(results => {
	/* Returns another promise, which resolves to the 
	 * text response we receive from the API*/
	return results.text()
})
.then(text => {
	/*This "text"  variable is the response that the
	 * 8? server gives us. Logging it on the console will show
	 * <stromng>10.0</strong> 
	 */
	const temperatureDisplay = 
		document.getElementById('temperature-display')
	temperatureDisplay.innerHTML = text
})
}

const fetchHumidity = () => {
fetch('/humidity')
.then(results => {
	return results.text()
})
.then(text => {
	const humidityDisplay = 
		document.getElementById('humidity-display')
	humidityDisplay.innderHTML = text
})
}

setInterval(() => {
	fetchTemperature()
	fetchHumidity()
}, 2000)
