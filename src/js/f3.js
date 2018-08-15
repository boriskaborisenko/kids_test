var score=0;
var carlap = 0;
var answer_lap = 0;

var setLaps = 7;
var qOnLap = setLaps+1;
var laps = 5;

//Total checkpoints 28. NOT 35. (qOnLap*laps - laps). Last checkpoint on every lap we move to the next lap. 


var megapoint;
var pointcorrection = 0.05;



var intro = false;
var currentIntro = 0;
var allSlides;
var slide;
var slideBtn;

var mainpath;
var stopstart;
var actv_st;
var stopper;
var hero;
var scoreGems=0;
var scoreText;
var levelpoints;
var gems_green;
var getgem;
var trig_left;
var trig_right;
var rundirection = 'left'; 

var assets;

const w = window.innerWidth;
const h = window.innerHeight;

const pw = 1920;
const ph = 1080;
const s = pw/ph > w/h ? true : false;
const zoomRatio = s ? w/pw : h/ph;

var config = {
    type: Phaser.AUTO,
    width: w,
    height: h,
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
        update: update,
        resize: resize
        
    }
};



var game = new Phaser.Game(config);








var FilePackObject = { 
    "test1": {
        "files": [
            {
                "type": "image",
                "key": "map",
                "url": "images/01_map.png"
            },
            {
                "type": "image",
                "key": "map_over",
                "url": "images/02_map.png"
            },
            {
                "type": "image",
                "key": "brick",
                "url": "images/brick.png"
            },
            {
                "type": "image",
                "key": "stopstart",
                "url": "game_content/blank_trig.png"
            },
            {
                "type": "image",
                "key": "trig",
                "url": "images/trig.png"
            },
            {
                "type": "spritesheet",
                "key": "gem_green",
                "url": "game_content/gems_green.png",
                "frameConfig": { frameWidth: 32, frameHeight: 32}
            },
            {
                "type": "spritesheet",
                "key": "fox_all",
                "url": "images/fox_new_anim_LONG_reduced.png",
                "frameConfig": { frameWidth: 120, frameHeight: 120}
            },
            
            
            
        ]
    },
    "test2":{
	    "svgpath":"M1552,790c-58.2-3.9-182,36-210,68s-128,87.4-179.9,78.6s-180.9-71-240.6-77.9c-59.7-6.9-97.7-15.2-139.5-12.8 s-149.7,19.7-198,2S482,726,452,708s-94.4-20.2-128-36s-87-51.2-122-58s-94-42-100-74s23.7-16.1,83-33c56-16,97.8-41.8,120-51 s53.8-17.7,65.4-33.6c11.6-15.9,47.7-73.1,75.6-86.4s24.4-24.3,62.9-32.5S598.2,269,686,290s146.3,41.9,207,61s193,77,257,73 s148-20,190-42s30.1-91.9,96.1-141.4c60-45,186-96,331.9-50.6c70.2,21.8,10,182,19.3,259.9c7.1,59.7-23.3,159.1-95.3,227.1 S1612,794,1552,790z"
    }
};



function preload(){
	
	/*
	this.load.image('load', 'images/load.jpg');
	
	this.load.image('intro1', 'images/intro1.jpg');
	this.load.image('intro2', 'images/intro2.jpg');
	this.load.image('intro3', 'images/intro3.jpg');
	this.load.image('btn', 'images/btn.png');
	*/
	
	/*
	this.load.image('map', 'images/01_map.png');
	this.load.image('map_over', 'images/02_map.png');
	this.load.image('brick', 'images/brick.png');
	this.load.image('stopstart', 'game_content/blank_trig.png');
	this.load.spritesheet('gem_green', 'game_content/gems_green.png', { frameWidth: 32, frameHeight: 32 });
	*/
	
	//this.load.pack('pack1', FilePackObject);
	assets = this.load.pack('pack1', 'js/pack.json');
	//console.log(FilePackObject.test2.svgpath)
	

	
	//this.load.spritesheet('gem_red', 'game_content/gems_red.png', { frameWidth: 32, frameHeight: 32 });
	//this.load.spritesheet('hero', 'game_content/dude.png', { frameWidth: 32, frameHeight: 48 });
	
	
	//this.load.spritesheet('fox_run', 'images/fox_run.png', { frameWidth: 100, frameHeight: 100 });
	//this.load.spritesheet('fox_stop', 'images/fox_stop.png', { frameWidth: 100, frameHeight: 100 });
	
	//this.load.spritesheet('fox_all', 'images/fox_new_anim_LONG_reduced.png', { frameWidth: 120, frameHeight: 120 });
	
	//this.load.image('trig', 'images/trig.png');
	
	
	
	this.load.audio('getgem', 'game_content/gem.mp3');
	
	
	
	
	//loading
	this.load.on('progress', function (value) {
	console.log(Math.ceil(value * 100)+' %' );
	});
	            
	
	 
	this.load.on('complete', function () {
	    console.log('loading complete');
	});
	
	
	
	
	
}








function create(){
	const scrollX = -1*(w-pw)/2
    const scrollY = -1*(h-ph)/2
    this.cameras.main.scrollX = scrollX;
    this.cameras.main.scrollY = scrollY;
    this.cameras.main.setZoom(zoomRatio);
    
	
	
  
	
   
    
	var map = this.add.image(0, 0, 'map').setOrigin(0);
	
	
	
	
	///svg path to point converter
	var polygonPoints = [];
	var canvsize = 1920;		
	var mypath = document.createElementNS("http://www.w3.org/2000/svg", "path")
  
  mypath.setAttribute('d', 'M1552,790c-58.2-3.9-182,36-210,68s-128,87.4-179.9,78.6s-180.9-71-240.6-77.9c-59.7-6.9-97.7-15.2-139.5-12.8 s-149.7,19.7-198,2S482,726,452,708s-94.4-20.2-128-36s-87-51.2-122-58s-94-42-100-74s23.7-16.1,83-33c56-16,97.8-41.8,120-51 s53.8-17.7,65.4-33.6c11.6-15.9,47.7-73.1,75.6-86.4s24.4-24.3,62.9-32.5S598.2,269,686,290s146.3,41.9,207,61s193,77,257,73 s148-20,190-42s30.1-91.9,96.1-141.4c60-45,186-96,331.9-50.6c70.2,21.8,10,182,19.3,259.9c7.1,59.7-23.3,159.1-95.3,227.1 S1612,794,1552,790z')
  
  //mypath.setAttribute('d', 'M627.6,227.1c-126,1.5-225-13.5-279,31.5c-48,40-30.5,594-4.5,747c9.9,58.2,474,22.9,468-66 c-4.7-69.1-264-15-289.5-55.5c-37.6-59.7-46.5-313.5-6-324c40.5-10.5,825-12,876-6c51,6,111,33,148.5,33c37.5,0,78-36,79.5-70.5 s-13.5-337.5-13.5-337.5s-24-55.5-87-48c-63,7.5-75,63-75,87s37.5,172.5-4.5,208.5s-408,34.5-442.5,4.5s19.5-126-28.5-172.5 C921.6,212.1,627.6,227.1,627.6,227.1z')
 
	var totalPathLength = mypath.getTotalLength();		
	for (var i=0; i < canvsize; i++ ) {
	  var p = mypath.getPointAtLength(i * totalPathLength / canvsize);
	  polygonPoints.push(p.x);
	  polygonPoints.push(p.y);
	}
	///svg conv end
	
	
	
	var dots = polygonPoints;
	
	
	
	//var dots = [];
	var newdots = [];
	dots.map(function (i) { newdots.push(i) });
	
	mainpath = new Phaser.Curves.Spline(newdots);
	mainpath.draw(this.add.graphics().lineStyle(1, 0xff303f, 3), 64);
	
	
	
	levelpoints = [];
	var allpoints = [
	 mainpath.getPoint(0.25),
	 mainpath.getPoint(0.40),
	 mainpath.getPoint(0.58),
	 mainpath.getPoint(0.75),
	];
   allpoints.map(function (i) { levelpoints.push(i) });
   
   this.anims.create({
        key: 'rotate_gem_green',
        frames: this.anims.generateFrameNumbers('gem_green', { start: 1, end: 6 }),
        frameRate: 10,
        repeat: -1
    });
	
	gems_green = this.physics.add.group();
    levelpoints.map(function (i) { 
	   this.gem_green = gems_green.create(i.x, i.y,  'gem_green');
	   gem_green.anims.play('rotate_gem_green', true);
	});
	
	getgem = this.sound.add('getgem');
	
	
	
	
	
	
	stopstart = this.physics.add.image(mainpath.getPoint(0.035).x,mainpath.getPoint(0.035).y, 'stopstart').setDisplaySize(1, 40);
	
	actv_st = this.physics.add.image(mainpath.getPoint(0.98).x,mainpath.getPoint(0.98).y, 'stopstart').setDisplaySize(1, 40);
	stopper = this.physics.add.sprite(mainpath.getPoint(0).x,mainpath.getPoint(0).y, 'brick');
	
	
	
	
	hero = this.add.follower(mainpath, 0,0, 'fox_stop');
	this.physics.world.enable(hero);
	
	
	this.physics.add.collider(hero, stopstart);
    this.physics.add.collider(hero, stopstart, carLaps, null, this);
    
    this.physics.add.collider(hero, actv_st);
    this.physics.add.collider(hero, actv_st, activateStartLine, null, this);
    
    
    this.physics.add.collider(hero, stopper);
    this.physics.add.collider(hero, stopper, stopCar, null, this);
    
    
    this.physics.add.collider(hero, gems_green);
    this.physics.add.collider(hero, gems_green, collect, null, this);
    
    
    
    trig_right = this.physics.add.image(mainpath.getPoint(0.41).x,mainpath.getPoint(0.41).y, 'trig');
	trig_left = this.physics.add.image(mainpath.getPoint(0.85).x,mainpath.getPoint(0.85).y, 'trig');
    
    this.physics.add.collider(hero, trig_right);
    this.physics.add.collider(hero, trig_right, trigRight, null, this);
    
    this.physics.add.collider(hero, trig_left);
    this.physics.add.collider(hero, trig_left, trigLeft, null, this);
    
    
	
	
	/////////hero anims
	 this.anims.create({
        key: 'left_idle',
        frames: this.anims.generateFrameNumbers('fox_all', { start: 6, end: 11 }),
        frameRate: 6,
        repeat: -1
    });
    
    this.anims.create({
        key: 'right_idle',
        frames: this.anims.generateFrameNumbers('fox_all', { start: 0, end: 5 }),
        frameRate: 6,
        repeat: -1
    });
    
    this.anims.create({
        key: 'left_run',
        frames: this.anims.generateFrameNumbers('fox_all', { start: 17, end: 21 }),  
        frameRate: 12,
        repeat: -1
    });
    
    this.anims.create({
        key: 'right_run',
        frames: this.anims.generateFrameNumbers('fox_all', { start: 12, end: 16 }),  
        frameRate: 12,
        repeat: -1
    });
	
	
	hero.startFollow({
	    positionOnPath: true,
	    duration: 30000,
        yoyo: false,
        repeat: -1,
        //rotateToPath: true,
        //verticalAdjust: true
   	});
   	
   	
   	/////
   	//hero.anims.play('left_idle');
   	
   	/////
   	
   	var map_over = this.add.image(0, 0, 'map_over').setOrigin(0);
   	scoreText = this.add.text(16, 16, 'score Gems: 0', { fontSize: '32px', fill: '#000' });
	


	//intro mode
   	var intros = [
	   	['intro1','desc1','btn'],
	   	['intro2','desc2','btn'],
	   	['intro3','desc3','btn']
   	];
   	
   	if(intro){
	   	allSlides = this.add.group();
	   	showIntro(currentIntro);
	   	
	   
	   	
	   	//slideBtn = game.add.text(0, 0, "Some text", {font: "16px Arial", fill: "#ffffff"});
	   	//sprite.addChild(text);
	   	//setTimeout(nextIntro, 4000);
	   	
	}
	
	//this.btnStart = new LabelButton(this.game, 480, 512, "buttonsprite", "Start game!", this.doBtnStartHandler, this, 1, 0, 2); // button frames 1=over, 0=off, 2=down
   	
	function showIntro(x){
	   	console.log(intros[x][0]);
	   	slide = allSlides.create(0, 0, intros[x][0]).setOrigin(0);
	   	slideBtn = this.world.add.sprite(980, 900, 'btn');
	}
   	
   	
   	function nextIntro(){
	   	currentIntro++;
	   	console.log('CURRENT INTRO '+currentIntro);
	   	if(currentIntro == intros.length){
		   console.log('intros end');
		   intro = false;	
	   	}else{
		  showIntro(currentIntro); 	
	   	}
	   	
   	}

   	
   	
   	
	
	
	
}





/* 
function showFPS() {
	console.log('FPS '+Math.ceil(game.loop.actualFps));
}
*/



function update(){
	//showFPS();
	document.getElementById('carlap').innerHTML = carlap;
	document.getElementById('anslap').innerHTML = answer_lap;
	document.getElementById('points').innerHTML = score;
}


function trigLeft(hero, trig_left){
	console.log('LEFT!');
	rundirection = 'left';
	hero.anims.play(rundirection+'_run');
	trig_left.body.enable = false;
	trig_right.body.enable = true;
}

function trigRight(hero, trig_right){
	console.log('RIGHT!');
	rundirection = 'right';
	hero.anims.play(rundirection+'_run');
	trig_left.body.enable = true;
	trig_right.body.enable = false;
}


function stopCar(){
	hero.pauseFollow();
	hero.anims.play(rundirection+'_idle', true);
}

function turnOn(){
	hero.resumeFollow();
}

function collect(hero, gem){
	console.log('collect gem');
	gem.disableBody(true, true);
	getgem.play();
	scoreGems += 10;
    scoreText.setText('Score: ' + scoreGems);
}





function activateStartLine(){
	stopstart.body.enable = true;
}



function carLaps(){
	stopstart.body.enable = false;        
	carlap++;
	stopper.body.enable = answer_lap > carlap ? false:true;
	console.log('carlap: '+carlap+'/'+laps+'  al('+answer_lap+')');
	
	if(carlap >laps){
		alert('FINISH!!! But u still a racer inside)))');
	}else{
		
		///////////////// respawn gems /////////////
		if(carlap > 1){
			levelpoints.map(function (i) { 
				this.gem_green = gems_green.create(i.x, i.y,  'gem_green');
				gem_green.anims.play('rotate_gem_green', true);
			});
		}
		//////////// respawn gems /////////////
		
		
	}
}







//var prevscore = 20;

function answer(empty){
	if(!intro){
	
	score++;
	/*
	score = 20;
	
	if(prevscore == score){
		///'move brick slooooooowly....  megapoint+0.01 '
	}
	*/
	
	var per = (score/qOnLap).toString();
	var lap = per.split('.')[0];
	megapoint = '0.'+per.split('.')[1];
	if(megapoint === '0.undefined'){megapoint = pointcorrection}
	
	answer_lap = parseInt(lap)+1;
	//console.log('aLAP :'+answer_lap + ' | cLAP :'+carlap);
	var newend = mainpath.getPoint(megapoint);
	stopper.x = newend.x;
	stopper.y = newend.y;
	
	stopper.body.enable = answer_lap > carlap ? false:true;
	hero.resumeFollow();
	hero.anims.play(rundirection+'_run');
	
	//prevscore = score;
	}else{
		console.log('server give data, but we in intro mode');
	}
}



function resize(){
	
}