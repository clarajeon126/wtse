import Phaser from 'phaser';
import Game from './scenes/Game';
const C = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 128,
    height: 96,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
        }
    }
};

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
  game.scene.add('game', Game)
  game.scene.start('game')
  window.addEventListener("resize",resize,false)
}
