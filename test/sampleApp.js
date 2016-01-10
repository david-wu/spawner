var express = require('express');
var app = express();

app.get('/', [serveStuff])

console.log('sample app')
function serveStuff(req, res){
    res.status(200).send({
        a:2,
    })
}

module.exports = app;