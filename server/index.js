const inst = require('./instarest')
const MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/animals-test'
const perPage = 20

inst.get('/airfields/page/:page', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    db
      .collection('airfields')
      .find()
      .skip(perPage * (req.params.page - 1))
      .limit(perPage)
      .toArray(function (err, results) {
        res.json(results)
      })
  })
})

inst.get('/airfields/:id', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    db
      .collection('airfields')
      .findOne({ ID: req.params.id }, function (err, result) {
        res.json(result)
      })
  })
})

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

inst.init(wss)