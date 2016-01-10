var cluster = require('cluster');



function Spawner(){
    process.on('message', messageHandler);
}

Spawner.prototype.messageHandler = function(msg){
    if(msg && msg.type==='server'){
        serveApp(strappedApp(msg.appPath), msg.port);
    }
};

Spawner.prototype.spawn = function(options){
    if(!cluster.isMaster){return;}
    var worker = cluster.fork()
    worker.send(options);
    worker.on('disconnect', options.onDisconnect || function(){});
};

Spawner.prototype.spawnServer = function(options){
    options.type = 'server';
    if(options.port){
        return this.spawn(options);
    }
    for(var i=0, l=options.ports.length; i<l; i++){
        options.port = options.ports[i];
        this.spawn(options)
    }
};

Spawner.prototype.spawnServerForever = function(options){
    var that = this;
    options.onDisconnect = function(){
        console.log('restarting ' + options.appPath);
        setTimeout(function(){
            that.spawnServer(options);
        }, options.backOffTime || 5000);
    }
    this.spawnServer(options);
};

function strappedApp(appPath){
    var express = require('express');
    var cors = require('cors');
    var bodyParser = require('body-parser');

    var app = express();
    app.use(cors());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    app.use('/', require(appPath));
    return app;
};

function serveApp(app, port){
    var http = require('http');
    var server = http.createServer(app);
    server.listen(port);
};

module.exports = new Spawner();