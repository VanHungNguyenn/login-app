const express = require('express')
const cors = require('cors')
const connect = require('./database/conn')

const app = express()
const morgan = require('morgan')

// middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.disable('x-powered-by') // security

const port = 8080

// http get request
app.get('/', (req, res) => {
	res.status(201).json('Home GET request')
})

/* start server only when we have valid connection */
connect()
	.then(() => {
		try {
			app.listen(port, () => {
				console.log(`Server is running to http://localhost:${port}`)
			})
		} catch (error) {
			console.log('Cannot connect to server')
		}
	})
	.catch((error) => {
		console.log('Invalid database connection')
	})
