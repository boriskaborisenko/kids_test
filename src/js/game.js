



var answers_to_next_checkpoint = 1;
var stars_by_lap = 5;
var total_laps = 2;






var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 625,
    parent: 'gamediv',
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

		
		
		
		
		
		
		
		
		
		
		
		
		var pathstart = new Phaser.Curves.Path(468,556).splineTo([468, 556]);
		var path0 = new Phaser.Curves.Path(468,556).splineTo([520, 560, 570, 560, 645, 527, 680, 490, 702, 454]);
		var path1 = new Phaser.Curves.Path(702, 454).splineTo([ 730, 430, 735, 390, 710,351, 722, 328, 753, 311, 753, 272, 730, 249, 690, 250, 655, 230, 640,196 ]);
	    var path2 = new Phaser.Curves.Path(640,196).splineTo([585, 166, 530, 166, 498, 174]);
	    var path3 = new Phaser.Curves.Path(498,174).splineTo([412, 188, 350, 240, 290, 250, 240,240]);
	    var path4 = new Phaser.Curves.Path(240,240).splineTo([210, 280, 144, 304, 95, 330, 66, 360, 53, 386, 85, 432, 139, 444, 200, 420  ]);
	    var path5 = new Phaser.Curves.Path(200, 420).splineTo([255, 446, 327, 454, 480, 438, 702, 454]);
	    var pathfinish = new Phaser.Curves.Path(200,420).splineTo([255, 446, 327, 454, 484, 352]);
	    
    
var current = 0;
 var hero;
 var scoreText;
 var score = 0;
var scoreText; 
var gameOver = false;
var stars;
var star;

var player; 

var game = new Phaser.Game(config);

function preload ()

{
    this.load.image('star', 'game_content/star.png');
    this.load.image('map', 'images/samplemap.jpg');
    this.load.image('overmap', 'images/samplemap_over.png');
    this.load.spritesheet('hero', 'game_content/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('btn', 'images/btn.png');
}

function create ()
{
	
	var button = this.add.image(0, 0, 'btn').setInteractive();
	button.on('pointerup', checkAnswer, this);
	
	var world = this.add.image(400, 312, 'map');
	scoreText = this.add.text(40, 550, 'score: 0', { fontSize: '32px', fill: '#fff' });
    
    var graphics = this.add.graphics();
	graphics.lineStyle(1, 0xff303f, 1);
	pathstart.draw(graphics, 128);
	pathfinish.draw(graphics, 128);
	path0.draw(graphics, 128);
    path1.draw(graphics, 128);
    path2.draw(graphics, 128);
    path3.draw(graphics, 128);
    path4.draw(graphics, 128);
    path5.draw(graphics, 128);
    
    

    
    //var player = this.physics.add.sprite(100, 450, 'hero');
    
   
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'hero', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('hero', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
   
    
    
    
    hero = this.add.follower(pathstart, 0, 0, 'hero');
    
    stars = this.physics.add.group({});
    star = stars.create(702, 454, 'star');
    star = stars.create(640,196, 'star');
    //stars.allowGravity = false;
    this.physics.add.collider(hero, stars);
   
    
    
    
   
    
    

	hero.startFollow({
        positionOnPath: true,
        //ease: 'Sine.easeInOut',
        duration: 1000,
        yoyo: false,
        repeat: 0,
        rotateToPath: true,
        verticalAdjust: true
    });
    
    
    
/*
    this.input.on('pointerdown', function () {
	});
 */   
    
    
    
   
    this.add.image(400, 300, 'overmap');
    
    
    
	
	

}


function testfunc(){
	console.log('testfunc')
}

function update(){
	//console.log('upd');
	
	this.physics.add.collider(hero, star, collectStar, null, this);
}



function collectStar (hero, star)
{
	console.log('collider');
}






var correct_answers = 0;

function checkAnswer(answer){
	if(answer == 'correct'){
		correct_answers++;
		correctAnswer(correct_answers);
	}else{
		console.log('answer wrong!');
	}
}




var finalcheckpoint = stars_by_lap*total_laps+1;
console.log(finalcheckpoint);
var current_checkpoint = 1;
var tofinal = false;


document.getElementById('laps').innerHTML = total_laps;

function correctAnswer(correct_answers)
{
	document.getElementById('counter').innerHTML = correct_answers;
	console.log('correct answer');
	
	
	if(correct_answers % answers_to_next_checkpoint == 0){
		console.log(correct_answers, 'GO TO NEXT CHECKPOINT');
		
		console.log('current checkpoint '+current_checkpoint);
		next_checkpoint = current_checkpoint+=1;
		console.log('next checkpoint '+next_checkpoint);
		
		
		if(current_checkpoint == finalcheckpoint+1){
			console.log("GO TO THE FINISH!");
			tofinal = true;
		}
		
		score += 10;
		scoreText.setText('Score: ' + score);
		
		
		
		
		
		current++;
		
		
		if(tofinal == true){
			hero.setPath(pathfinish, 
            	{
	            	duration:2500,
	            	positionOnPath: true
            	}
            );

		}else{
			var paths = [
	        {"path":pathstart, "speed":4000},
	        {"path":path0, "speed":1000},
	        {"path":path1, "speed":1000},
	        {"path":path2, "speed":500},
	        {"path":path3, "speed":500},
	        {"path":path4, "speed":1500},
	        {"path":path5, "speed":1500},
	        //{"path":pathfinish, "speed":4000},
	    ];
        
        
        

        if (current === paths.length)
        {
            current = 2;
            hero.setPath(paths[current].path, 
            	{
	            	duration:paths[current].speed,
	            	positionOnPath: true
            	}
            );
            //hero.anims.stop();
        }
		else
        {
            hero.setPath(paths[current].path, 
            	{
	            	duration:paths[current].speed,
	            	positionOnPath: true
            	}
            );
            
            hero.anims.play('left', true);
        }
		}
        
       

	
	
	
	
	
	
	
	
	
	}else{
		console.log('not enougth correct answers');
	}
	
	/*
	score += 1;
    scoreText.setText('Score: ' + score);
	current++;
        
       var paths = [
	        {"path":pathstart, "speed":4000},
	        {"path":path0, "speed":1000},
	        {"path":path1, "speed":1000},
	        {"path":path2, "speed":500},
	        {"path":path3, "speed":500},
	        {"path":path4, "speed":1500},
	        {"path":path5, "speed":1500},
	        //{"path":pathfinish, "speed":4000},
	    ];
        
        
        

        if (current === paths.length)
        {
            current = 2;
            hero.setPath(paths[current].path, 
            	{
	            	duration:paths[current].speed,
	            	positionOnPath: true
            	}
            );
            //hero.anims.stop();
        }
		else
        {
            hero.setPath(paths[current].path, 
            	{
	            	duration:paths[current].speed,
	            	positionOnPath: true
            	}
            );
            
            //hero.anims.play('left', true);
        }
        */
}