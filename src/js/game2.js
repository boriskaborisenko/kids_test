

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'gamediv', { preload: preload, create: create });

function preload(){
  game.load.image('bunny','https://examples.phaser.io/assets/sprites/bunny.png')
}

function create() {
  //create your path in whatever data structure you want.
  //I use the help of an svg element here
  var path = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path.setAttribute('d', 'M148.185,118.975c0,0-92.592,39.507-80.247,79.013,s79.012,143.21,129.629,124.691s64.198-113.856,120.988-100.755s118.518,30.384,116.049,109.397s-82.715,118.519-97.53,201.235,s-92.593,139.505,0,159.259')
  var totalPathLength = path.getTotalLength();
  var startPoint = path.getPointAtLength(0)

  //we will move the bunny from phaser examples
  bunny = game.add.sprite(startPoint.x,startPoint.y,'bunny');
  bunny.scale.set(0.25)
  bunny.anchor.set(0.5)

  //let's draw the path
  debugPath = game.add.graphics(0,0)
  debugPath.lineStyle(1,0xff0000)
  debugPath.moveTo(startPoint.x,startPoint.y)

  //a little tween helper so we can tween
  //a single variable
  tweenHelper = {progress: 0}
  tweenHelper.onUpdate = function(tween, value){
    p = path.getPointAtLength(totalPathLength * value)
    bunny.position.x = p.x
    bunny.position.y = p.y

    debugPath.lineTo(p.x, p.y)
  }
  //tween it!
  tween = game.add.tween(tweenHelper).to( { progress: 1}, 5000).start()
  tween.onUpdateCallback(tweenHelper.onUpdate)
}