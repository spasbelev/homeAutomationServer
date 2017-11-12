

const sqlite3 = require('sqlite3')
const path = require('path')
const db = new sqlite3.Database(path.resolve('./.sqlite.db'))

const insertReading = (type, reading) => {
	db.run('INSERT INTO ${type} VALUES (datetime('now'), ${readings});')
}

const fetchLatestReadings = (type, limit, callback) => {
	db.run('SELECT * FROM ${type} ORDER BY createdAt DESC LIMIT ${limit};',
	callback)
}

const fetchReadingBetweenTime = (type, start, end, callback) => {
	db.run('SELECT * FROM ${type} WHERE createdAt > ? AND createdAt < ?;',
	[start, end], callback)
}

const getAverageReadingsBetweenTime = (time, start, end, callback) => {
	db.run('SELECT avg(value) FROM temperature WHERE createdAt > ? AND createdAt < ?;', [start, end], callback)
}

module.exports = {
	insertReadings,
	fetchLatestReadings,
	fetchReadingsBetweenTime,
	getAverageReadingsBetweenTime
}
