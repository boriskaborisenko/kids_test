var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1280,
    height: 500,
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

var players;
var player;
var tweens;
var allPlayers;
var self;


var positions = [
	{"id":"01", "direction":"left", "tint":"0x229fff", "x":100, "y":100},
	{"id":"02", "direction":"left", "tint":"0xff303f", "x":200, "y":200},
	{"id":"03", "direction":"left", "tint":"0xdddccc", "x":300, "y":300},
];


function preload(){
	this.load.spritesheet('dude', 'game_content/dude_42.png', { frameWidth: 32, frameHeight: 42 });
	this.load.image('grid', 'game_content/isogrid.png');
}





function create(){
	this.add.image(0, 0, 'grid').setOrigin(0);
	
	this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
	
	
	
	

	self = this;






	
	
	allPlayers = this.physics.add.group();
	//positions.map(function (i) { 
	
	for (i=0; i < positions.length; i++){
		addPlayer(positions[i], self)
	}
	
	/*
	
	for(i=0; i < positions.length; i++){
		//player = players.create(positions[i].x, positions[i].y,  'dude').setTint(positions[i].tint);
		//player.playerId = positions[i].id;
		
		var onePlayer = this.physics.add.sprite(positions[i].x, positions[i].y, 'dude').setDisplaySize(32, 48).setTint(positions[i].tint);
 
		var oneTween = this.tweens.add({
	        targets: onePlayer,
	        x: positions[i].x,
	        y: positions[i].y,
	        duration: 1,
	        ease: 'Sine.easeInOut',
	        //onComplete: onCompleteHandler,
	        //onCompleteParams: [ players.children.entries[i] ]
    	});
 
  
  onePlayer.playerId = positions[i].id;
  onePlayer.MyTWEEN = oneTween;
  //allPlayers.scene.tweens.add(oneTween);
  //onePlayer.scene.tweens.add(oneTween);
  
  allPlayers.add(onePlayer);
  */
  
  
  /*
  allPlayers.scene.tweens.add({
	        targets: allPlayers.children.entries[i],
	        x: positions[i].x,
	        y: positions[i].y,
	        duration: 1,
	        delay: 0,
	        //ease: 'Sine.easeInOut',
	        onComplete: onCompleteHandler,
	        onCompleteParams: [ allPlayers.children.entries[i] ],
	        onStart: onStartHandler,
			onStartParams: [ allPlayers.children.entries[i], positions[i].direction ]
	        //onUpdate: onUpdateHandler

    	});
    	*/
    	
  //console.log(allPlayers);			
	//allPlayers.children.entries[i].scene.tweens.add(oneTween)			
		/*
		player.scene.tweens.add({
	        targets: player,
	        x: positions[i].x,
	        y: positions[i].y,
	        duration: 1,
	        ease: 'Sine.easeInOut',
	        //onComplete: onCompleteHandler,
	        //onCompleteParams: [ players.children.entries[i] ]
    	});
    	
    	//tween.stop();
    	//console.log(tween)
    	//console.log(players.scene)
    	
		player.anims.play('turn', true);
		*/
	//}	
	//});
	
	
	//console.log(allPlayers)
	//console.log(allPlayers.children.entries[0].MyTWEEN)
	
	
	//console.log(this.tweens)
	

}



function removePlayer(id, self){
	allPlayers.getChildren().forEach(function (onePlayer) {
      if(id === onePlayer.playerId) {
        onePlayer.destroy();
      }
    });
}

function addPlayer(data, self){
	console.log(data)
	var onePlayer = self.physics.add.sprite(data.x, data.y, 'dude').setDisplaySize(32, 48).setTint(data.tint);
 
		var oneTween = self.tweens.add({
	        targets: onePlayer,
	        x: data.x,
	        y: data.y,
	        duration: 1,
	        ease: 'Sine.easeInOut',
	        //onComplete: onCompleteHandler,
	        //onCompleteParams: [ players.children.entries[i] ]
    	});
 
  
  onePlayer.playerId = data.id;
  onePlayer.MyTWEEN = oneTween;
 
  
  allPlayers.add(onePlayer);
}



function move(){
	var newPositions = [
		{"id":"01", "direction":"left", "dur":Math.random()*1000, "tint":"0x229fff", "x":Math.floor(Math.random() * 100), "y":Math.floor(Math.random() * 500)},
		{"id":"02", "direction":"left", "dur":Math.random()*1000, "tint":"0xff9ddd", "x":Math.floor(Math.random() * 100), "y":Math.floor(Math.random() * 500)},
		{"id":"03", "direction":"left", "dur":Math.random()*1000,"tint":"0xcccddd", "x":Math.floor(Math.random() * 100), "y":Math.floor(Math.random() * 500)},
	
	{"id":"04", "direction":"left", "dur":Math.random()*1000,"tint":"0xcccddd", "x":Math.floor(Math.random() * 100), "y":Math.floor(Math.random() * 500)},
	];
	
	//console.log(allPlayers.children.entries)
	/*
	for(i=0; i < allPlayers.children.entries.length; i++){
		console.log(allPlayers.children.entries[i].playerId)
		for(j=0; j < newPositions.length; j++){
			//console.log(newPositions[j].id)
			if(newPositions[j].id === allPlayers.children.entries[i].playerId){
				console.log('player exist')
			}else{
				console.log('new player')
			}
		}
	}
	*/
	
	for(i=0; i < newPositions.length; i++){
		for(j=0; j < allPlayers.children.entries.length; j++){
			if(newPositions[i].id === allPlayers.children.entries[j].playerId){
				console.log(newPositions[i].id, 'player exist')
			}else{
				console.log('new player')
			}
		}
	}
	
	
	/*
	for (var i = 0; i < this._tweens.length; i++)
        {
            this._tweens[i].pendingDelete = true;
        }

        this._add = [];
	*/
	//console.log(players.scene.tweens)
	//tween.stop(1);
	//console.log(players.scene.tweens)
	//console.log(this._tweens)
	//console.log(this.tweens)
	//for(i=0; i < newPositions.length; i++){
	/*
		allPlayers.children.entries[i].MyTWEEN;
		
		console.log(allPlayers.children.entries[i].MyTWEEN.targets=allPlayers.children.entries[i]);
		console.log(allPlayers.children.entries[i].MyTWEEN.data);
		console.log(allPlayers.children.entries[i].MyTWEEN.parent);
		allPlayers.children.entries[i].MyTWEEN.updateTo('x', 400, true);
		allPlayers.children.entries[i].MyTWEEN.updateTo('y', 20, true);
		//allPlayers.children.entries[i].MyTWEEN.play();
		allPlayers.children.entries[i].setTint(newPositions[i].tint);
	*/
		/*
		allPlayers.children.entries[i].MyTWEEN.add({
	        targets: allPlayers.children.entries[i],
	        x: newPositions[i].x,
	        y: newPositions[i].y,
	        duration: 2000,
	        delay: 0,
	        //ease: 'Sine.easeInOut',
	        onComplete: onCompleteHandler,
	        onCompleteParams: [ allPlayers.children.entries[i] ],
	        onStart: onStartHandler,
			onStartParams: [ allPlayers.children.entries[i], newPositions[i].direction ]
	        //onUpdate: onUpdateHandler

    	});
		*/
		
		//players.children.entries[i].setTint(newPositions[i].tint);
		//console.log(tween);
		//players.children.entries[i].scene.tweens.tween.stop();
		//console.log()
			/*
			players.children.entries[i].scene.tweens.add({
	        targets: players.children.entries[i],
	        x: newPositions[i].x,
	        y: newPositions[i].y,
	        duration: 2000,
	        delay: 0,
	        //ease: 'Sine.easeInOut',
	        onComplete: onCompleteHandler,
	        onCompleteParams: [ players.children.entries[i] ],
	        onStart: onStartHandler,
			onStartParams: [ players.children.entries[i], newPositions[i].direction ]
	        //onUpdate: onUpdateHandler

    	});
    	//players.children.entries[i].scene.tweens.scene.tween.pause();
    	//tween.pause();
    	//tween.resume();
    	//players.scene.tweens.tween.stop();
    	//players.scene.tweens.tween.restart();
    	players.children.entries[i].anims.play(newPositions[i].direction, true);
    	*/	
	//}

	
	//console.log(players.scene.tweens.tween)
	
}







function onCompleteHandler(tween, targets, player){
		player.anims.play('turn', true);
		player.setAlpha(1);
		//tween.stop();
		//tween.destroy();
}

function onStartHandler (tween, targets, player, direction)
{
    player.anims.play(direction, true);
    player.setAlpha(0.3);
}


function update(){
	 
}