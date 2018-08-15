var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1000,
    height: 700,
    backgroundColor: '#eeeeee',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {x:0, y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var line;
var self;
var fullhp;
var onehit;
var boss;
var cannon;
var bullet;
var bang;

var url = 'https://raw.githubusercontent.com/boriskaborisenko/kids_test/master/src/';

function preload(){
	this.load.image('frame', url+'images/hb/frame.png');
	this.load.image('bg', url+'images/hb/bg.png');
	this.load.image('line', url+'images/hb/line.png');
	this.load.image('line2', url+'images/hb/line2.png');
	this.load.image('boss', url+'images/boss/pirate.png');
	this.load.image('level', url+'images/boss/level.png');
	this.load.image('cannon', url+'images/boss/cannon.png');
	this.load.spritesheet('bullet', url+'images/boss/bullet.png', { frameWidth: 150, frameHeight: 100 });
	this.load.spritesheet('bang', url+'images/boss/bang.png', { frameWidth: 150, frameHeight: 100 });
}

function create(){
	
	this.add.image(0, 0, 'level').setOrigin(0,0);
	
	self = this;
	posX = 450;
	posY = 10;
	this.add.image(posX, posY, 'bg').setOrigin(0,0).setDepth(1000);
	this.add.image(posX, posY, 'frame').setOrigin(0,0).setDepth(1003);
	line = this.add.image(posX+150, posY+74, 'line2').setOrigin(0,0).setDepth(1002);
	onehit = line.displayWidth/10;
	
	boss = this.physics.add.image(800, 400, 'boss').setDisplaySize(400,400);
	cannon = this.physics.add.image(200, 400, 'cannon').setDisplaySize(370,370);
	bang = this.physics.add.sprite(800,436, 'bang').setAlpha(0);
	
	
    
    this.anims.create({
        key: 'fire',
        frames: this.anims.generateFrameNumbers('bullet', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({
        key: 'bang',
        frames: this.anims.generateFrameNumbers('bang', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: 0
    });
    
	
}

function hit(){
	bullet = self.physics.add.sprite(264,446, 'bullet').setAlpha(1);
	bullet.anims.play('fire',true);
	
	self.tweens.add({ targets: bullet, 
	    x: 800, 
	    y: Phaser.Math.Between(320,456),
	    duration: 1000,
	     onStart: onStartHandler,
        onStartParams: [ bullet ],
        onComplete: onCompleteHandler,
        onCompleteParams: [ bullet ],
	    });
	
		
}

function onStartHandler(tween, targets, bullet){
	//console.log('start fire')
}

function onCompleteHandler(tween, targets, bullet){
	bullet.destroy();
	bang.x = bullet.x;
	bang.y = bullet.y;
	bang.setAlpha(1);
	bang.anims.play('bang',true);
	
	fullhp = line.displayWidth;
		if(fullhp>0){
			self.tweens.add({ targets: line, displayWidth: { value: fullhp - onehit, duration: 500 }, });
		}else{
			console.log('BOSS DEFEATED');
		}
	
}

function update(){
	
}