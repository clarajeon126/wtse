import Phaser from 'phaser';
import Game from './scenes/Game';
import Parallax from './scenes/Parallax';
import Intro from './scenes/Intro';
import Text from './scenes/Text';
import Death from './scenes/Death';
import Leaderboard from './scenes/Leaderboard';
import Congrat from './scenes/Congrat';

const C = {
    type: Phaser.CANVAS,
    parent: 'phaser-example',
    width: 1920,
    height: 1080,
    pixelArt: true,
    dom: {
        createContainer: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: [Congrat, Intro, Leaderboard, Parallax, Death]
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
    resize()
    window.addEventListener("resize",resize,false)
}