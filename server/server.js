var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function(req, res) {
  res.send('server Hi ' + req.query.name)
})

app.post('/', jsonParser, function(req, res) {
  res.send(req.body)
})


app.listen(3000)