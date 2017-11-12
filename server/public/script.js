


const temperatureChartConfig = {
	type: 'line',
	data: {
		label: [],
		datasets: [{
			data: [],
			backgroundColor: 'rgba(255, 205, 210, 0.5)'
		}]
	},
	options: {
		legend: {
			display: false
		},
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			yAxes: [{
				ticks: {
					suggestedMin: 10,
					suggestedMax: 40
				}
			}]
		}
	}
}


const fetchTemperature = () => {
fetch('/temperature')
.then(results => {
	/* Returns another promise, which resolves to the 
	 * text response we receive from the API*/
	return results.json()
})
.then(data => {
	/*This "text"  variable is the response that the
	 * 8? server gives us. Logging it on the console will show
	 * <stromng>10.0</strong> 
	 */
	const now = new Date()
	const timeNow = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
	pushData(temperatureChartConfig.data.labels, timeNow, 10)
	pushData(temperatureChartConfig.data.datasets[0].data, data.value, 10)
	temperatureChart.update()
	const temperatureDisplay = 
		document.getElementById('temperature-display')
	temperatureDisplay.innerHTML = '<strong>' + data.value + '</strong>'
})
}

const temperatureCanvasCtx = document.getElementById('temperature-chart').getContext('2d')

const humidityCanvasCtx = document.getElementById('humidity-chart').getContext('2d')

const humidityChartConfig = {
		type: 'line',
		data: {
			labels:[ ],
			datasets: [{
				data: [],
				backgroundColor: 'rgba(255, 205, 210, 0.5)'
			}]
		},
		options: {
			legend: {
				display: false
			},
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				yAxes: [{
					ticks: {
						suggestedMin: 25,
						suggestedMax: 90
					}
				}]
			}
		}
	}

const temperatureChart = new Chart(temperatureCanvasCtx, temperatureChartConfig)

const fetchHumidity = () => {
fetch('/humidity')
.then(results => {
	return results.json()
})
.then(data => {
	const now = new Date()
	const timeNow = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
	pushData(humidityChartConfig.data.labels, timeNow, 10)
	pushData(humidityChartConfig.data.datasets[0].data, data.value, 10)

	humidityChart.update()
	const humidityDisplay = 
		document.getElementById('humidity-display')
	humidityDisplay.innerHTML = '<strong>' + data.value + '</strong>'
})
}

const humidityChart = new Chart(humidityCanvasCtx, humidityChartConfig)

const pushData = (arr, value, maxLen) => {
	arr.push(value)
	if (arr.length > maxLen) {
		arr.shift()
	}
}

setInterval(() => {
	fetchTemperature()
	fetchHumidity()
}, 2000)
