import Phaser from "../node_modules/phaser/"
import TitleScreen from './scenes/TitleScreen.js'
import PongGame from './scenes/PongGame.js'
import Game from './scenes/Game.js'

const config = {
    width: 128,
    height: 96,
    type: Phaser.AUTO,
    zoom: 5,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            debug: true
        }
    }
}

const game = new Phaser.Game(config)
game.scene.add('titlescreen', TitleScreen)
game.scene.add('game', Game)
game.scene.start('game')