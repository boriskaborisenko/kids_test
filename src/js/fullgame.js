

var basesize;
/*
if(window.innerWidth > window.innerHeight){
	basesize = window.innerWidth;
} else {
	basesize = window.innerHeight;
}
*/


	
	if(window.innerWidth/2.01 > window.innerHeight){
		basesize = window.innerHeight;	
	}else{
		basesize = window.innerWidth;
	}



var koef = 1.9;
var w = basesize;
var h = w/koef;


var dots;
var newdots;


document.getElementById("gamediv").style.width = w+'px';
document.getElementById("gamediv").style.height = eval(w/1.9)+'px';
document.getElementById("gamediv").style.marginTop = eval((window.innerHeight-h)/2)+'px';


var config = {
    type: Phaser.AUTO,
    //width:1280,
    //height:673,
    width: w,
    height: h,
    parent: 'gamediv',
    //backgroundColor: '#ff303f',
    scaleMode:0,
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
        resize: resize
    }
};



var game = new Phaser.Game(config);


function preload() {
	this.load.image('map', 'images/samplemap_1280-673_1-9.jpg');
	this.load.spritesheet('gem_green', 'game_content/gems_green.png', { frameWidth: 32, frameHeight: 32 });
}

function create() {
	this.bg = this.add.image(0, 0, 'map').setOrigin(0).setDisplaySize(game.config.width, game.config.height);



dots = [
972,509,
1028,297,
752,185,
424,321,
244,423,
370,499,
972,509
];

gx = 408;
gy = 437;


newdots = [];
dots.map(function (i) { newdots.push(i) });
console.log(newdots)
	
	mainpath = new Phaser.Curves.Spline(newdots);
	mainpath.draw(this.add.graphics().lineStyle(1, 0xff303f, 3), 64);
	
	
	this.final_gem = this.physics.add.sprite(408,437, 'gem_green').setDisplaySize(40, 40);
	this.anims.create({
        key: 'rotate_gem_green',
        frames: this.anims.generateFrameNumbers('gem_green', { start: 1, end: 6 }),
        frameRate: 10,
        repeat: -1
    });
    this.final_gem.anims.play('rotate_gem_green', true);
	
	
	
	this.events.on('resize', resize, this);
	this.events.on('keydown', resize, this);
}






function resize (width, height)
{
	
if(width/2.01 > height){
		base = height;	
	}else{
		base = width;
	}
	
	
	 
	
	
	document.getElementById("gamediv").style.width = base+'px';
	
	console.log('resize', width, width/1.9);
	document.getElementById("gamediv").style.height = eval(base/1.9)+'px';
	document.getElementById("gamediv").style.marginTop = eval((height-base/1.9)/2)+'px';
    
    
    //console.log('==',perc,'==');
    this.cameras.resize(base, base/1.9);
    //game.scene.scenes.forEach(function (scene) {
			this.cameras.main.setViewport(0, 0, base, base/1.9);
			
		//});
	//this.bg.setDisplaySize(base, base/1.9);
	
}


window.addEventListener('resize', function (event) {
	game.resize(window.innerWidth, window.innerHeight);
}, false);








document.addEventListener("keydown", function(e) {
  //Option+Space -- Alt+Space
  if (e.keyCode == 32 && e.altKey) { 
    toggleFullScreen('gamediv');
  }
}, false);

function toggleFullScreen(elem) {
	var elem = document.getElementById(elem);

if (!elem.fullscreenElement &&    // alternative standard method
      !elem.mozFullScreenElement && !elem.webkitFullscreenElement) {  // current working methods
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
}




