import express from 'express'
import cors from 'cors'
import axios from 'axios'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', async (req, res) => {
  try {
    let clientIP =
      req.headers['x-forwarded-for'] || req.connection.remoteAddress
    if (clientIP.includes(',')) clientIP = clientIP.split(',')[0]
    const response = await axios.get('http://ip-api.com/json/' + clientIP)
    res.send(response.data)
  } catch (error) {
    res.status(500).send('Unable to fetch IP')
  }
})

app.use((req, res) => {
  res.status(400).send('No route found!')
})

app.listen(process.env.PORT)
