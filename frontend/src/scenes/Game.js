import Phaser from "phaser";

export default class Game extends Phaser.Scene {
    preload() {
        this.load.spritesheet(
            "background",
            "./assets/background.png",
            {
              frameWidth: 128,
              frameHeight: 96
            }
          );
    }

    create() {
        this.add.image(128, 96, 'background')
        // const width = window.innerWidth
        // const height = window.innerHeight

        // const movingCircle = this.add.circle(width * .5, height * .8, height * .05 , height * .05, 0xff0000, 1)
        // const stepGradRect = this.add.rectangle(width * 0.5 , height * 0.8, width * 0.25, height * 0.05, 0xffffff, 1)

        // stepGradRect.b
    }
}