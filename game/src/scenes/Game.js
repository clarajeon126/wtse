import Phaser from "phaser";
import background from '../assets/background.png';
import avatar from '../assets/person.png'
export default class Game extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('logo', background);
        this.load.spritesheet('avatar', avatar, {
            frameWidth:100
        })
    }
      
    create ()
    {
        const logo = this.add.image(64, 48, 'logo');
        logo.setOrigin = (0.0,0.0)
        this.avatar = this.add.sprite(20,65, 'avatar')
        this.physics.add.existing(this.avatar, true)
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        
        if (this.cursors.left.isDown) {
            console.log("left")
            this.avatar.x -= 1
        }
        else if (this.cursors.right.isDown) {
            console.log("right")
            this.avatar.x += 1
        }
        else {
        }

    }
}