const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { MONGO_URI } = require('./config')

const app = express()
const morgan = require('morgan')

const router = require('./router/route')

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

/* api route */
app.use('/api', router)

// connect to database
mongoose.set('strictQuery', false)
mongoose.connect(MONGO_URI, (err) => {
	if (err) throw err
	console.log('Connected to mongodb')
})

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})
