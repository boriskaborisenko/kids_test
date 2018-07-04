var DEF_W = 1280;
var DEF_H = 800;
var basesize;
var ratio;

var config = {
    type: Phaser.AUTO,
    width: DEF_W,
    height: DEF_H,
    parent: 'gamediv',
    backgroundColor: '#000000',
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
	this.load.image('map', 'images/samplemap_1280-800.jpg');
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

newdots = [];
dots.map(function (i) { newdots.push(i) });
	
	var mainpath = new Phaser.Curves.Spline(newdots);
	mainpath.draw(this.add.graphics().lineStyle(1, 0xff303f, 3), 64);
	
	
	this.final_gem = this.physics.add.sprite(408,437, 'gem_green').setDisplaySize(40, 40);
	this.anims.create({
        key: 'rotate_gem_green',
        frames: this.anims.generateFrameNumbers('gem_green', { start: 1, end: 6 }),
        frameRate: 10,
        repeat: -1
    });
    this.final_gem.anims.play('rotate_gem_green', true);
	
	
}





function resize() {
	
	
		var delta = window.innerWidth/window.innerHeight;
		var realH = window.innerHeight;
		var realW = window.innerWidth;
		var mustRealH = realW/1.77;
		
		document.getElementsByTagName("body")[0].setAttribute('style',
		'overflow:hidden;'
		);
		
		
	
		ratio = window.innerWidth/window.innerHeight; 
	   
	    if(ratio > 1.75){
			basesize = window.innerHeight;
			
			document.getElementById('abs').setAttribute('style',
			'position:absolute;'+
			'width: '+realH*1.77+'px; '+
			'height: '+realH/1.77+'px; '+
			'margin-left: '+(realW-realH*1.77)/2+'px;'
			);
			
			var newW = basesize*1.77;
			var newH = basesize;
				
		}else{
			basesize = window.innerWidth;
			
			document.getElementById('abs').setAttribute('style',
			'position:absolute;'+
			'width: '+realW+'px; '+
			'height: '+mustRealH+'px; '+
			'margin-top: '+(realH-mustRealH)/2+'px;'
			);
			var newW = basesize;
			var newH = basesize/1.77;
		}
		
		
		var scaleA = newW / DEF_W;
		var scaleB = newH / DEF_H;
		
		game.canvas.setAttribute('style',
		' -ms-transform: scale(' + scaleA + ','+scaleB+' );' +
		' -webkit-transform: scale3d(' + scaleA + ','+scaleB+', 1);' +
		' -moz-transform: scale(' + scaleA + ','+scaleB+');' + 
		' -o-transform: scale(' + scaleA + ','+scaleB+');' +
		' transform: scale(' + scaleA + ','+scaleB+');' +
		' transform-origin: top left;'
		);
		
		
		/*
		game.canvas.setAttribute('style',
		'zoom:'+scaleA+''
		);
		*/
		
		
		
		width = newW / scaleA;
		height = newH / scaleB;
		
		//console.log(Math.ceil(width),' ', Math.ceil(height) ); 
		
		game.resize(width, height);
		
		game.scene.scenes.forEach(function (scene) {
			scene.cameras.main.setViewport(0, 0, width, height);
			scene.cameras.resize(width, height);
		});
	}

	




if(game.isBooted){resize();	
}else{game.events.once('boot', resize);}	
	
	







window.addEventListener('resize', function (event) {
	resize();
}, false);	





document.addEventListener("keydown", function(e) {
  //Option+Space -- Alt+Space
  if (e.keyCode == 32 && e.altKey) { 
    toggleFullScreen('abs');
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
    //resize();
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