const w = window.innerWidth;
const h = window.innerHeight;

const pw = 640;
const ph = 400;
const s = pw/ph > w/h ? true : false;
const zoomRatio = s ? w/pw : h/ph;

var config = {
    type: Phaser.AUTO,
    parent: 'gamediv',
    width: w,
    height: h,
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('bg', 'http://54.229.38.167:9000/test.png');
    this.load.image('item', 'http://54.229.38.167:9000/test2.png');
}

function create ()
{
    
    this.add.image(0, 0, 'bg').setOrigin(0);
    this.add.image(pw/4, (ph/4)*3, 'item').setOrigin(0.5);


    // camera1 = this.cameras.main;
    var camera1 = this.cameras.main;
    const scrollX = -1*(w-pw)/2
    const scrollY = -1*(h-ph)/2
    camera1.scrollX = scrollX;
    camera1.scrollY = scrollY;
    camera1.setZoom(zoomRatio);
}