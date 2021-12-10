import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'
const app = express()

app.use(cors())
app.get('/', async (req, res) => {
  try {
    const clientIP =
      req.headers['x-forwarded-for'] || req.connection.remoteAddress
    if (clientIP.includes(',')) clientIP = clientIP.split(',')[0]
    console.log(clientIP)
    const response = await fetch('http://ip-api.com/json/' + clientIP)
    const decode = await response.json()
    res.send(decode)
  } catch (error) {
    res.status(500).send('Unable to fetch IP')
  }
})

app.use((req, res) => {
  res.status(400).send('No route found!')
})

app.listen(process.env.PORT)
