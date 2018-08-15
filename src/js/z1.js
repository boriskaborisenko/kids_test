
var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: window.innerWidth,
    height: window.innerHeight,
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

//var controls;

var playerA;
var playerB;
var playerC;
var walls;
var cursors;
var ghost;
var d;
var rad;
var smartcam;

var circle;



var game = new Phaser.Game(config);


function preload ()
{
    this.load.image('grid', 'game_content/4000_4000.png');
    this.load.image('lines', 'game_content/grid4000.png');
    this.load.spritesheet('dude', 'game_content/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('wall', 'game_content/wall.png');
    this.load.image('ghost', 'game_content/ghost3.png');
    
    
    this.load.on('complete', () => {
          setTimeout(function(){
	          console.log('loaded delay');
	          smartcam = 3990;
          }, 500);
        });
}

function create ()
{
  
  	
    
    this.add.image(0, 0, 'grid').setOrigin(0);
    this.add.image(0, 0, 'lines').setOrigin(0);
    
    this.cameras.main.setBounds(0, 0, 4000, 4000);
    this.physics.world.setBounds(0, 0, 4000, 4000);
    //this.cameras.main.setDeadzone(100, 100);
    //this.cameras.main.setZoom(1);
    
    
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
        movePlayer(otherPlayer, movement, 200);
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
  
  
  
 
  
  
 function movePlayer(player, move, s){
	//console.log(player, move, s)
	
	player.body.velocity.y = 0;
    player.body.velocity.x = 0;
	
	if(move === 'left'){
		player.body.velocity.x -= s;
	}
	
	if(move === 'right'){
		player.body.velocity.x += s;
	}
	
	if(move === 'up'){
		player.body.velocity.y -= s;
	}
	
	if(move === 'down'){
		player.body.velocity.y += s;
	}
	
	
	if(move === 'up-left'){
		player.body.velocity.y -= s;
		player.body.velocity.x -= s;
	}
	
	if(move === 'up-right'){
		player.body.velocity.y -= s;
		player.body.velocity.x += s;
	}
	
	if(move === 'down-left'){
		player.body.velocity.y += s;
		player.body.velocity.x -= s;
	}
	
	if(move === 'down-right'){
		player.body.velocity.y += s;
		player.body.velocity.x += s;
	}
	
	
	
 } 
  
  
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
}
    
    
 
    
    
    
    
    
   
	
	var levelwalls = [
		{x:70 , y:20},
		{x:70 , y:90},
		{x:70 , y:160},
		{x:2000 , y:2000},
	];
	
	walls = this.physics.add.staticGroup();
    levelwalls.map(function (i) { 
	   walls.create(i.x, i.y,  'wall');
	});
	
	ghost = this.physics.add.image(0,0, 'ghost').setOrigin(0.5, 0.5);
	this.cameras.main.startFollow(ghost, true, 0.05, 0.05);
	
	this.physics.add.collider(this.otherPlayers, walls);
	//this.physics.add.collider(this.otherPlayers, this.otherPlayers);
	
	
	//console.log(this.cameras.main.worldView.width)
	
	
}





function update ()
{
	
 compute(this.otherPlayers.children.entries);
 //ghost.setDisplaySize(rad*2+100, rad*2+100);
 
 //this.cameras.main.setBounds(0, 0, rad*2+100, rad*2+100);
this.cameras.main.centerOn(ghost.x, ghost.y); 

	var zr = 1200/(rad*4);
	
	
		if(zr < 1.15){
			this.cameras.main.setZoom(zr);
		}else{
			this.cameras.main.setZoom(1.15);
		}
	
	
	
	
	//console.log(zr);
	//console.log(Math.floor(this.cameras.main.displayWidth))


}


 function compute(data){
	//console.log(data.length);
	var a=0;
	var b=0;
	
	for(i=0; i < data.length; i++){
		a += data[i].body.x;
		b += data[i].body.y;
	}
	
	var gx = a/data.length;
	var gy = b/data.length;
	
	ghost.x = gx;
	ghost.y = gy;
	
	d = 0;
	var rads = [];
	for(i=0; i < data.length; i++){
		 var a1 = data[i].body.x - ghost.x;
		 var b1 = data[i].body.y - ghost.y;
		 var c1 = Math.sqrt( a1*a1 + b1*b1);
		 d += c1;
		 rads.push(c1);
	}
	
	//console.log(rads)
	rad =  Math.max.apply(null, rads);
	//console.log(data[0].body.x) 
 }


function moveHero(hero, s){
	
	hero.body.velocity.y = 0;
    hero.body.velocity.x = 0;
	
	if (cursors.left.isDown)
    {
        hero.body.velocity.x -= s;
	}
   if (cursors.right.isDown)
    {
        hero.body.velocity.x += s;
    }
    if (cursors.up.isDown)
    {
        hero.body.velocity.y -= s;
    }
     if (cursors.down.isDown)
    {
       hero.body.velocity.y += s;
    }
}

/*
	<h1>Phaser</h1>
                {  <pre>{JSON.stringify(this.props.currentActivity.users, null, 2)}</pre> }
                {Object.keys(usersState || {}).map(u => {
                    const user = usersState[u];
                    return (<div key={user.index}>index: {user.index}, x: {user.x}, y: {user.y}</div>);
                })}
                
                */
