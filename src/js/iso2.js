var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1280,
    height: 800,
    backgroundColor: '#eeeeee',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {x:0, y: 0 },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var player;
var cursors;
var text;
var tween;

function preload(){
	this.load.spritesheet('dude', 'game_content/dude_42.png', { frameWidth: 32, frameHeight: 42 });
	this.load.image('grid', 'game_content/isogrid.png');
}


function create(){
	
	
	/*
	text = this.add.text(20, 20, "x: -\ny: -", {
        font: "12px Arial",
        fill: "#ff0044",
        align: "left"
    });
    */
    
    
    
	
	this.add.image(0, 0, 'grid').setOrigin(0);
    
	
	var self = this;
  this.socket = io();
  
  
  this.otherPlayers = this.physics.add.group();

  
  
  
  
  this.socket.on('currentPlayers', function (players) {
    Object.keys(players).forEach(function (id) {
      if (players[id].playerId === self.socket.id) {
        //addPlayer(self, players[id]);
        console.log('admin connected');
      } else {
        addOtherPlayers(self, players[id]);
        console.log('player conencted');
      }
    });
  });
  
  
  
  
  this.socket.on('move', function (movement, playerId) {
    self.otherPlayers.getChildren().forEach(function (otherPlayer) {
      if (playerId === otherPlayer.playerId) {
        movePlayer(otherPlayer, movement);
      }
    });
  });

  
  this.socket.on('newPlayer', function (playerInfo) {
    addOtherPlayers(self, playerInfo);
  });
  
  this.socket.on('disconnect', function (playerId) {
    self.otherPlayers.getChildren().forEach(function (otherPlayer) {
      if (playerId === otherPlayer.playerId) {
        otherPlayer.destroy();
      }
    });
  });
  
 
  
 function addOtherPlayers(self, playerInfo) {
  var otherPlayer = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'dude').setDisplaySize(32, 48);
 
  
  if (playerInfo.team === 'blue') {
    otherPlayer.setTint(0x735DFB);
  } else {
    otherPlayer.setTint(0xF08832);
  }
  
  otherPlayer.playerId = playerInfo.playerId;
  self.otherPlayers.add(otherPlayer);
  self.otherPlayers.defaults.setCollideWorldBounds = true;
  //console.log( self.otherPlayers.scene);
  
 
        /*
        self.otherPlayers.scene.tweens.scene.tweens.add({
        targets: otherPlayer,
        ease: 'Sine.easeInOut',
        x:otherPlayer.x -=40,
        y:otherPlayer.y +=(40/2),
        duration: 1500});
        */
        
 }

}

function update(){
	//moveHero(player,50);
	 
}


function movePlayer(player, move){
      //console.log(player, move)
      console.log(player.body.x, player.body.y)
      
      
      if(move == 'pseudo-right'){
	  	
	  	player.body.velocity.x += 40;
	  	player.body.velocity.y +=(40/2);
	  	setTimeout(function(){
		  player.body.velocity.y = 0;
		  player.body.velocity.x = 0;	
	  	}, 1000);
	  	    
      }
      if(move == 'pseudo-left'){
	    
	  	setTimeout(function(){
		  player.body.velocity.y = 0;
		  player.body.velocity.x = 0;	
	  	}, 1000); 
	  	player.body.velocity.x -= 40;
	  	player.body.velocity.y +=(40/2);
	  	   
      }
      
      /*
      	if(move == 'pseudo-left'){
	      	
	      	player.scene.tweens.add({
		  	targets: player,
		  	//ease: 'Sine.easeInOut',
		  	x: Math.ceil(player.x +=40),
		  	y: Math.ceil(player.y +=(40/2)),
		  	duration: 500,
		  	onComplete: function(){console.log('hhhhhh')},
		  	});
      	}
      	*/
      
       	
  } 


