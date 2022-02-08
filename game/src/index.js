import Phaser from 'phaser';
import Game from './scenes/Game';
import Parallax from './scenes/Parallax';
import Intro from './scenes/Intro';
import Text from './scenes/Text';
const C = {
    type: Phaser.CANVAS,
    parent: 'phaser-example',
    width: 1920,
    height: 1080,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: [Parallax]
};

// var C = {
            
//     type: Phaser.AUTO,
//     width: 2048,
//     height: 1024,
//     //zoom: 4,
//     pixelArt: true,
//     physics: {
//         default: 'arcade',
//         arcade: {
//             gravity: { y: 300 },
//             debug: false
//         }
//     }

// };

//resize canvas!!
function resize() {
    let canvas = document.querySelector("canvas");
    let width = window.innerWidth;
    let height = window.innerHeight;
    let wratio = width / height;
    let ratio = C.width / C.height;
    if (wratio < ratio) {
        canvas.style.width = width + "px";
        canvas.style.height = (width / ratio) + "px";
        
    } else {
        canvas.style.width = (height * ratio) + "px";
        canvas.style.height = height + "px";
    }
}

window.onload = () => {
  const game = new Phaser.Game(C)


}


// const config = {
//     type: Phaser.AUTO, // Which renderer to use
//     width: 800, // Canvas width in pixels
//     height: 600, // Canvas height in pixels
//     parent: "game-container", // ID of the DOM element to add the canvas to
//     scene: {
//       preload: preload,
//       create: create,
//       update: update
//     }
//   };
  
//   const game = new Phaser.Game(config);
  
//   function preload() {
//     // Runs once, loads up assets like images and audio
//     this.load.image("mario-tiles", "/src/assets/cracktilemap.png");

//   }
  
//   function create() {
//     // Runs once, after all assets in preload are loaded
//     const level = [
//         [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ]
//       ];
    
//       // When loading from an array, make sure to specify the tileWidth and tileHeight
//       const map = this.make.tilemap({ data: level, tileWidth: 80, tileHeight: 220 });
//       const tiles = map.addTilesetImage("mario-tiles");
//       const layer = map.createLayer(0, tiles, 0, 0);
//   }
  
//   function update(time, delta) {
//     // Runs once per frame for the duration of the scene
//   }


