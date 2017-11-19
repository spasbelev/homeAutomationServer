
/*Define the listeners for our humidity and temperature.  */
const listeners = {
	temperature: [],
	humidity: []
}

/* Arguments: callback function, type
 * Brief: Pushes the provided listener to the array of listeners
 * (either to temperature or humidity listener array depending on 
 * "type" parameter */
const subscribe = (listener, type) => {
	listeners[type].push(listener)
}

/* Arguments: callback function, type
 * Brief: Provides a way to unsubscribe(remove) a listener from 
 * the subscribed array */
const unsubscribe = (listenerToBeRemoved, type) => {
	listeners[type] = listeners[type].filter(listener =>
		listener != listenerToBeRemoved)
}

const notify = (value, type) => {
	listeners[type].forEach(listener => {
		listener(value)
	})
}

module.exports = {
	subscribe, unsubscribe, notify
}
