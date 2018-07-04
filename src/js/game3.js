var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 625,
    parent: 'gamediv',
    scaleMode:1,
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
        render: render
    }
};

var game = new Phaser.Game(config);










var total_laps = 2;
var rundirection = 'right';





/////////paths and points///////////

var startpath = new Phaser.Curves.Spline([
	490.5,567.5,532.5,571.5,559.5,561.5,578.5,561.5,599.5,561.5,605.5,551.5,614.5,551.5,614.5,541.5, 
		627.5,541.5,627.5,526.5,644.5,526.5,651.5,513.5,661.5,504.5,684.5,498.5,705.5,463.5 
]);


var mainpath = new Phaser.Curves.Spline([
711.5,476.5,735.5,463.5,745.5,437.5,745.5,421.5,735.5,399.5,728.5,385.5,723.5,371.5,733.5,353.5,754.5,339.5,768.5,324.5,768.5,307.5,768.5,283.5,750.5,265.5,734.5,259.5,711.5,259.5,680.5,253.5,659.5,247.5,663.5,229.5,651.5,207.5,627.5,191.5,603.5,182.5,573.5,176.5,554.5,176.5,530.5,172.5,511.5,172.5,498.5,178.5,480.5,178.5,461.5,185.5,438.5,199.5,417.5,207.5,399.5,222.5,382.5,230.5,371.5,252.5,364.5,261.5,349.5,259.5,336.5,262.5,318.5,265.5,302.5,267.5,282.5,269.5,268.5,263.5,257.5,259.5,245.5,260.5,232.5,263.5,216.5,275.5,208.5,288.5,204.5,302.5,187.5,304.5,164.5,308.5,139.5,316.5,117.5,324.5,103.5,331.5,80.5,342.5,65.5,354.5,51.5,371.5,47.5,391.5,47.5,416.5,56.5,432.5,71.5,446.5,97.5,454.5,118.5,460.5,137.5,460.5,157.5,460.5,169.5,446.5,184.5,441.5,198.5,441.5, 198.5,441.5,208.5,441.5,220.5,446.5,233.5,457.5,241.5,462.5,258.5,
466.5,278.5,466.5,302.5,466.5,316.5,466.5,350.5,470.5,381.5,470.5,413.5,464.5,437.5,466.5,470.5,470.5,505.5,467.5,528.5,470.5,587.5,467.5,641.5,470.5,683.5,476.5,711.5,476.5]);





var finalpath = new Phaser.Curves.Spline([
	198.5,441.5,220.5,446.5,233.5,458.5,248.5,464.5,278.5,464.5,315.5,469.5,341.5,469.5,376.5,462.5, 
		400.5,448.5,426.5,441.5,441.5,429.5,446.5,411.5,455.5,396.5,473.5,386.5,498.5,381.5,516.5,369.5
]);




var levelpoints = [];
var allpoints = [
	 mainpath.getPoint(0),
	 mainpath.getPoint(0.17),
	 mainpath.getPoint(0.29),
	 mainpath.getPoint(0.51),
	 mainpath.getPoint(0.79)  
   ];













function preload ()
{
	
	
	this.load.image('startscreen', 'game_content/hello.png');
	
    
    this.load.spritesheet('gem_green', 'game_content/gems_green.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('gem_red', 'game_content/gems_red.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('trigger', 'game_content/blank_trig.png');
    this.load.image('map', 'images/samplemap.jpg');
    this.load.image('overmap', 'images/samplemap_over.png');
    this.load.spritesheet('hero', 'game_content/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('ninja', 'game_content/ningabig.png', { frameWidth: 40, frameHeight: 40 });
    this.load.audio('getgem', 'game_content/gem.mp3');
    this.load.audio('win', 'game_content/win.mp3');
    this.load.audio('run', 'game_content/run.mp3');
    this.load.audio('soundtrack', 'game_content/bg.mp3');
    //this.load.audio('load', 'game_content/load.mp3');
}






function create ()
{
	
//наколхозим кнопочку
	var button = this.add.image(0, 0, 'btn').setInteractive();
	button.on('pointerup', answer, this);
	
	 ///////paste backmap	
	this.add.image(400, 312.5, 'map');
	
	


///////add sounds	
	getgem = this.sound.add('getgem');
	win = this.sound.add('win');
	soundtrack = this.sound.add('soundtrack',1, true);
	run = this.sound.add('run',1, true);
	//load = this.sound.add('load',1, true);
	//load.play();
	//soundtrack.play();


//////////////// draw path for dev
/*
    var graphics = this.add.graphics();
    mainpath.draw(graphics.lineStyle(3, 0xff303f, 3), 64);
    startpath.draw(graphics.lineStyle(3, 0x7E50BE, 3), 64);
    finalpath.draw(graphics.lineStyle(3, 0x52C26F, 3), 64);
*/  
	
/////////// place checkpoints on mainpath////////////////	
allpoints.map(function (i) { levelpoints.push(i) });
   
 



/////////gems animations////////////   
    this.anims.create({
        key: 'rotate_gem_green',
        frames: this.anims.generateFrameNumbers('gem_green', { start: 1, end: 6 }),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({
        key: 'rotate_gem_red',
        frames: this.anims.generateFrameNumbers('gem_red', { start: 1, end: 6 }),
        frameRate: 10,
        repeat: -1
    });


////////add gems on map    
	gems_green = this.physics.add.group();
	for( var i=0; i < allpoints.length; i++ ){
		gem_green = gems_green.create(levelpoints[i].x, levelpoints[i].y-36,  'gem_green');
		gem_green.anims.play('rotate_gem_green', true);
		
	}
	
	final_gem = this.physics.add.sprite(516.5,349.5, 'gem_red');
	final_gem.anims.play('rotate_gem_red', true);
	final_gem.disableBody(true, true);






///////triggers for turn hero//////
   var turn_hero_right = mainpath.getPoint(0.65);
   var turn_hero_left = mainpath.getPoint(0.12);
   
   var trigger_right = this.physics.add.image(turn_hero_right.x, turn_hero_right.y, 'trigger');
   var trigger_left = this.physics.add.image(turn_hero_left.x, turn_hero_left.y, 'trigger');



///////////HERO follower, animations, colliders, overlaps settings/////////////
    
    //hero = this.add.follower(startpath, 0,0, 'hero');
     hero = this.add.follower(startpath, 0,0, 'ninja');
	this.physics.world.enable(hero);
	this.physics.add.collider(hero, gems_green);
    this.physics.add.collider(hero, gems_green, stone, null, this);
    
    this.physics.add.collider(hero, final_gem);
    this.physics.add.collider(hero, final_gem, endLevel, null, this);
    
    this.physics.add.collider(hero, trigger_left);
    this.physics.add.collider(hero, trigger_left, for_trigger_left, null, this);
    
    this.physics.add.collider(hero, trigger_right);
    this.physics.add.collider(hero, trigger_right, for_trigger_right, null, this);
    
    hero.startFollow({
	    positionOnPath: true,
	    duration: 1500,
        yoyo: false,
        repeat: 0,
        //verticalAdjust: true,
        //rotateToPath: true,
        //rotationOffset: -200
    });
    
        
    
    /*
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('hero', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    */
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'hero', frame: 4 } ],
        frameRate: 20
    });
    
    
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('ninja', { start: 0, end: 9 }),
        frameRate: 20,
        repeat: -1
    });
    
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('ninja', { start: 30, end: 39 }),
        frameRate: 20,
        repeat: -1
    });
    
   this.anims.create({
        key: 'idle_left',
        frames: this.anims.generateFrameNumbers('ninja', { start: 10, end: 19 }),
        frameRate: 20,
        repeat: -1
    });
    
    this.anims.create({
        key: 'idle_right',
        frames: this.anims.generateFrameNumbers('ninja', { start: 20, end: 29 }),
        frameRate: 20,
        repeat: -1
    });
    
    
    setTimeout(function(){hero.pauseFollow()}, 0);
    //hero.anims.play('turn', true);
    hero.anims.play('idle_'+rundirection, true);
    
    
	///////paste top layer backmap	
	this.add.image(400, 312.5, 'overmap');
	startscreen = this.add.image(400, 312.5, 'startscreen').setInteractive().on('pointerup', startgame, this);
    



}


function render(){
	this.debug.inputInfo(32, 32);
}



 

/*================= A few funcs ================*/

function startgame(){
	document.getElementById('btns').style.display = "block";
	startscreen.destroy();
	//load.stop();
	soundtrack.play();
}



////////overlapping with gems
function stone(hero, gem){
	console.log('overlap');
	run.stop();
	getgem.play();
	gem.disableBody(true, true);
	//hero.anims.play('turn', true);
	hero.anims.play('idle_'+rundirection, true);
	hero.pauseFollow();
            
}

function endLevel(hero, final_gem){
	console.log('LEVEL END...');
	endlevel = true;
	//run.stop();
	getgem.play();
	//win.play();
	//soundtrack.stop();
	hero.anims.play('turn', true);
	//hero.anims.play('idle_'+rundirection, true);
	final_gem.disableBody(true, true);
}



//////switch run direction
function for_trigger_left(){
	console.log('trigger LEFT');
	rundirection = 'left';
	//hero.anims.play('turn', true);
	//hero.anims.play(rundirection, true);
	hero.anims.play(rundirection, true);
}

function for_trigger_right(){
	console.log('trigger RIGHT');
	rundirection = 'right';
	//hero.anims.play('turn', true);
	//hero.anims.play(rundirection, true);
	hero.anims.play(rundirection, true);
}






/*====================== Crazy movement logic (refactoring needed ;) ) =====================*/
var current_checkpoint = 0;
var endlevel = false;
var isend = false;
var respawn = false;
var resp_last_two = false;
var gemsonlevel = allpoints.length*total_laps;

var answers_to_next_checkpoint = 3;
var answers = 0;

document.getElementById('laps').innerHTML = total_laps;
document.getElementById('answ').innerHTML = answers_to_next_checkpoint;

function answer(){
	
	
	
	//crazy logic start
		if(!endlevel){
		answers++;
		document.getElementById('counter').innerHTML = answers;
		if(answers % answers_to_next_checkpoint == 0){
			
			current_checkpoint++;
			levelpoints.shift();
			gemsonlevel--;
			console.log(levelpoints.length,' LEFT ON LAP GEMS');
			console.log(gemsonlevel,' LEFT GEMS');
			console.log(current_checkpoint, 'CHECKPOINTS DONE');
			
			
			
			
			if(current_checkpoint == 1){
				hero.resumeFollow();
				hero.anims.play(rundirection, true);
				run.play();
			}else{
			
			
				if(current_checkpoint == 2){
					
					hero.setPath(mainpath, 
		            	{
			            	duration:10000,
			            	repeat:-1,
			            	positionOnPath: true
		            	}
		            );
		            hero.anims.play(rundirection, true);
		            run.play();
				}else{
					if(!isend){
						
						if(resp_last_two){
							console.log('RESP TWO LAST GEMS');
							
							setTimeout(function(){
								
							for( var i=allpoints.length-3; i < levelpoints.length; i++ ){
								gem_green = gems_green.create(levelpoints[i].x, levelpoints[i].y-36,  'gem_green');
								gem_green.anims.play('rotate_gem_green', true);
							}
							
							}, 1000);
							
							resp_last_two = false;
						}
						
						
						hero.resumeFollow();
						hero.anims.play(rundirection, true);
						run.play();
					}else{
						hero.setPath(finalpath, 
			            	{
				            	duration:1500,
				            	repeat:0,
				            	positionOnPath: true
			            	}
						);
						hero.anims.play(rundirection, true);
						run.play();
					}
						
				}
				
				
				if(gemsonlevel == 0 && levelpoints.length==0){
					console.log('BUILD FINAL PATH');
					isend=true;
					final_gem.enableBody(true, 516.5,359.5, true, true);
				}
				
				
				if(gemsonlevel != 0 && levelpoints.length ==0){
					console.log('respawn GEMS');
					   if(isend == false){
						 allpoints.map(function (i) { levelpoints.push(i) });
							for( var i=0; i < levelpoints.length-2; i++ ){
								gem_green = gems_green.create(levelpoints[i].x, levelpoints[i].y-36,  'gem_green');
								gem_green.anims.play('rotate_gem_green', true);
							}
							resp_last_two = true;  
					   }
				}
			
			
		   }
		
		
		}else{
			console.log('Need more correct answers....');
		}	
	//crazy logic end	
		
	}else{
		console.log('LEVEL END. Nothing happens...');
	}	







}













