import Phaser from "phaser";

export default class PongGame extends Phaser.Scene {
    preload() {

    }
    
    create() {
        const ball = this.add.circle(400, 250, 10, 0xff0000, 1)
        this.physics.add.existing(ball)
        ball.body.setCollideWorldBounds(true, 1, 1)
        ball.body.setVelocity(-200, -200)
        ball.body.setBounce(1, 1)

        this.paddleLeft = this.add.rectangle(50, 250, 30, 100, 0xffffff, 1)
        
        this.physics.add.existing(this.paddleLeft, true)
        this.physics.add.collider(this.paddleLeft, ball)
        
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        if (this.cursors.up.isDown) {
            console.log("up")
            this.paddleLeft.y -= 10
            this.paddleLeft.body.updateFromGameObject()
        }
        else if (this.cursors.down.isDown) {
            console.log("down")
            this.paddleLeft.y += 10
            this.paddleLeft.body.updateFromGameObject()

        }
        else {
        }
    }
}