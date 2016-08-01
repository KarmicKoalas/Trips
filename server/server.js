
var express = require('express')
app = express();
var http = require('http')
var server = require('http').Server(app);
var port = process.env.PORT || 3001;
app.use(express.static('../'));
var api = require("./api");

// var bodyParser = require('body-parser');
// app.use(bodyParser.json());

server.listen(port, ()=>
  console.log('server listening on port: ' + port)
  );
// use socket.io
var io = require('socket.io').listen(server);


//turn off debug
io.set('log level', 1);

// define interactions with client
io.sockets.on('connection', function(socket){

     socket.on('location', function(data) {
<<<<<<< 3104e525d03734f8f30120af2a1ffa5bf730404d
      console.log("Incoming location:", data)

      //sending dummy data for group update 
=======
      console.log("Incoming location:", data);
>>>>>>> combined group arr from server works
      socket.emit('groupUpdate', {'group':[{'latitude': data.coordinates.latitude, 'longitude':  data.coordinates.longitude, 'title': 'Konst' }, {'latitude':data.coordinates.latitude + 0.0008, 'longitude': data.coordinates.longitude, 'title': 'Bo' }]});
    });
    socket.on('error', function(err) {
      console.log("Error", err);
    });
});

module.exports = app;
