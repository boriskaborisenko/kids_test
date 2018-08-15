var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
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



function preload(){
	this.load.json('map', 'json/file.json');
    this.load.spritesheet('tiles', 'http://labs.phaser.io/assets/tests/iso/isometric-grass-and-water.png', { frameWidth: 64, frameHeight: 64 });
    this.load.image('house', 'http://labs.phaser.io/assets/tests/iso/rem_0002.png');
}


function create(){
	scene = this;
buildMap ();
placeHouses ();
//this.cameras.main.setSize(1280, 800);
//this.cameras.main.scrollX = 440;
//this.cameras.main.setZoom(0.6);	
}

function update(){
	
}

function placeHouses ()
{
    var house = scene.add.image(0, 0, 'house');

    house.depth = house.y + 186;

   
}



function buildMap ()
{
    //  Parse the data out of the map
    var data = scene.cache.json.get('map');

    var tilewidth = data.tilewidth;
    var tileheight = data.tileheight;

    tileWidthHalf = tilewidth / 2;
    tileHeightHalf = tileheight / 2;

    var layer = data.layers[0].data;

    var mapwidth = data.layers[0].width;
    var mapheight = data.layers[0].height;

    var centerX = mapwidth * tileWidthHalf;
    var centerY = 16;

    var i = 0;

    for (var y = 0; y < mapheight; y++)
    {
        for (var x = 0; x < mapwidth; x++)
        {
            id = layer[i] - 1;

            var tx = (x - y) * tileWidthHalf;
            var ty = (x + y) * tileHeightHalf;

            var tile = scene.add.image(centerX + tx, centerY + ty, 'tiles', id);

            tile.depth = centerY + ty;

            i++;
        }
    }
}