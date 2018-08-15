const express = require('express')
const app = express()

var server = require('http').Server(app);
var io = require('socket.io').listen(server);
 






app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

app.get('/conv',function(req,res){
    res.sendFile(__dirname+'/conv.html');
});

app.get('/player',function(req,res){
    res.sendFile(__dirname+'/player.html');
});


app.get('/path',function(req,res){
    res.sendFile(__dirname+'/path.html');
});



app.get('/game',function(req,res){
    res.sendFile(__dirname+'/game.html');
});


app.use('/css',express.static(__dirname + '/src/css'));
app.use('/js',express.static(__dirname + '/src/js'));
app.use('/images',express.static(__dirname + '/src/images'));
app.use('/json',express.static(__dirname + '/src/json'));
app.use('/game_content',express.static(__dirname + '/src/game_content'));



var pcount = [];
var players = {};


io.on('connection', function (socket) {
  console.log('a user connected');
  // create a new player and add it to our players object
  pcount.push(socket.id);
  console.log(pcount);
  players[socket.id] = {
    rotation: 0,
    //x: Math.floor(Math.random() * 500) + 50,
    //y: Math.floor(Math.random() * 500) + 50,
    x: 41,
    y: 38,
    playerId: socket.id,
    team: (Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue'
  };
  // send the players object to the new player
  socket.emit('currentPlayers', players);
  socket.broadcast.emit('newPlayer', players[socket.id]);
  
  // when a player disconnects, remove them from our players object
  socket.on('disconnect', function () {
    console.log('user disconnected');
    pcount.splice(pcount.indexOf(socket.id), 1);
    console.log(pcount);
    // remove this player from our players object
    delete players[socket.id];
    // emit a message to all players to remove this player
    io.emit('disconnect', socket.id);
  });

  socket.on('move', function(movement){
	  io.emit('move',movement, socket.id);
  })

});





server.listen(3333, function () {
  console.log(`Listening on ${server.address().port}`);
});