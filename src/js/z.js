
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

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('grid', 'game_content/4000_4000.png');
    this.load.image('lines', 'game_content/grid4000.png');
    this.load.spritesheet('dude', 'game_content/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('wall', 'game_content/wall.png');
    this.load.image('ghost', 'game_content/ghost.png');
}

function create ()
{
    
    
    
    this.cameras.main.setBounds(0, 0, 4000, 4000);
    this.physics.world.setBounds(0, 0, 4000, 4000);
    
    this.add.image(0, 0, 'grid').setOrigin(0);
    this.add.image(0, 0, 'lines').setOrigin(0);
    
	
	
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
	
	playerA = this.physics.add.sprite(300, 100, 'dude');
	playerA.setCollideWorldBounds(true);
	
	playerB = this.physics.add.sprite(300, 300, 'dude');
	playerB.setCollideWorldBounds(true);
	
	playerC = this.physics.add.sprite(500, 600, 'dude');
	playerC.setCollideWorldBounds(true);
	
	
	
	this.physics.add.collider(playerA, walls);
	this.physics.add.collider(playerB, walls);
	this.physics.add.collider(playerC, walls);
	
	ghost = this.physics.add.image(0,0, 'ghost');
	 this.cameras.main.startFollow(ghost, true, 0.05, 0.05);
	 this.cameras.main.setDeadzone(100, 100);
	  //this.cameras.main.startFollow(playerB, true, 0.05, 0.05);
	//  Input Events
    cursors = this.input.keyboard.createCursorKeys();
	

	console.log(cursors);
}

function update ()
{
  moveHero(playerA,300); 
  
  moveHero(playerB,150); 
  
  moveHero(playerC,50); 
  
  var gx = (playerA.x+playerB.x+playerC.x)/3;
  var gy = (playerA.y+playerB.y+playerC.y)/3;
  
  ghost.x = gx;
  ghost.y = gy;
 
 
 var a1 = playerA.x - ghost.x;
 var b1 = playerA.y - ghost.y;
 var c1 = Math.sqrt( a1*a1 + b1*b1);
 
 var a2 = playerB.x - ghost.x;
 var b2 = playerB.y - ghost.y;
 var c2 = Math.sqrt( a2*a2 + b2*b2);
 
 var a3 = playerC.x - ghost.x;
 var b3 = playerC.y - ghost.y;
 var c3 = Math.sqrt( a3*a3 + b3*b3);
 
 
 
 //console.log(this.cameras.main.worldView);
 var d = c1+c2+c3;
 console.log(d);
 if(d<2000){
	this.cameras.main.setZoom(1-(d/3000));	 
 }




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
