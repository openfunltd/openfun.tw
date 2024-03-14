const express = require('express')
const path = require('path')
const app = express()

app.use('/favicon.ico', express.static(__dirname + '/favicon.ico'))
app.use('/images', express.static(__dirname + '/images'))
app.use('/css', express.static(__dirname + '/css'))
app.use('/js', express.static(__dirname + '/js'))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
})
app.use('/robots.txt', express.static(__dirname + '/robots.txt'))
 
app.listen(3006)
