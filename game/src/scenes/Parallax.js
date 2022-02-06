import Phaser from "phaser";
import bushes from "../assets/passets/bushes.png";
import city from "../assets/passets/city.png";
import closecity from "../assets/passets/closecity.png";
import farcity from "../assets/passets/farcity.png";
import sidewalk from "../assets/passets/sidewalk.png";
import sky from "../assets/passets/sky.png";
import streetlights from "../assets/passets/streetlights.png";
import gradient from "../assets/passets/gradient.png"
// import background from "../assets/passets/b.png";
import slider from "../assets/slider.png"
import person from "../assets/person.png"
export default class Parallax extends Phaser.Scene {

    preload() {
            this.load.image('bushes', bushes);
            this.load.image('city', city);
            this.load.image('closecity', closecity);
            this.load.image('farcity', farcity);
            this.load.image('sidewalk', sidewalk);
            this.load.image('sky', sky);
            this.load.image('streetlights', streetlights);
            this.load.image('gradient', gradient)
            this.load.image('slider', slider)
            this.load.spritesheet('person', person, { frameWidth: 100});
    }

    create() {
        this.sky = this.add.tileSprite(96,54, 192, 108,'sky');
        this.farcity = this.add.tileSprite(96, 54, 0, 0, 'farcity');
        this.city = this.add.tileSprite(96, 54, 0, 0, 'city');
        this.closecity = this.add.tileSprite(96, 54, 0, 0, 'closecity');
        this.sidewalk = this.add.tileSprite(96, 54, 0, 0, 'sidewalk');
        this.streetlights = this.add.tileSprite(96, 54, 0, 0, 'streetlights');
        this.bushes = this.add.tileSprite(96, 54, 0, 0, 'bushes');
        this.gradiant = this.add.image(96, 90, 'gradient')
        this.slider = this.add.image(96, 90, 'slider')

        this.physics.add.existing(this.slider)
        this.slider.body.setBounce(1, 1)

        this.leftInvisWall = this.add.rectangle(62, 90, 1, 9, 0xff0000, 1)
        this.rightInvisWall = this.add.rectangle(130, 90, 1, 9, 0xff0000, 1)
        this.bottomInvisWall = this.add.rectangle(96, 99, 68, 1, 0xff0000, 1)

        this.physics.add.existing(this.leftInvisWall, true)
        this.physics.add.existing(this.rightInvisWall, true)
        this.physics.add.existing(this.bottomInvisWall, true)

        this.physics.add.collider(this.bottomInvisWall, this.slider)
        this.physics.add.collider(this.leftInvisWall, this.slider)
        this.physics.add.collider(this.rightInvisWall, this.slider)
        // this.sidewalk = this.physics.add.staticGroup();
        // this.sidewalk.create(96, 800, 'sidewalk');

        this.player = this.physics.add.sprite(20, 75, 'person');
        
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        // this.anims.create({
        //     key: 'right',
        //     frames: this.anims.generateFrameNumbers('person', { start: 0, end: 2 }),
        //     frameRate: 2,
        //     repeat: -1
        // });

        // this.anims.create({
        //     key: 'left',
        //     frames: this.anims.generateFrameNumbers('person', { start: 0, end: 4 }),
        //     frameRate: 4,
        //     repeat: -1
        // });

        // this.anims.create({
        //     key: 'turn',
        //     frames: [{ key: 'person', frame: 5 }],
        //     frameRate: 20,
        // });

        this.cursors = this.input.keyboard.createCursorKeys();
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // this.physics.add.collider(this.player, this.sidewalk);
    }

    
    update() {
        
        function moveParallaxBG() {
            
        }

        if (Phaser.Input.Keyboard.JustDown(this.rightKey)) {
            this.farcity.tilePositionX += .1;
            this.city.tilePositionX += .2;
            this.closecity.tilePositionX += .4;
            this.streetlights.tilePositionX += .8;

            this.slider.body.setVelocityX(100)
            // this.morehills.tilePositionX += 1.6;
            // this.road.tilePositionX += 3.2;
    

            // //player.x +=2;
            // this.player.anims.play('right', true);
        }
        else if (Phaser.Input.Keyboard.JustDown(this.leftKey)) {
            this.farcity.tilePositionX += .1;
            this.city.tilePositionX += .2;
            this.closecity.tilePositionX += .4;
            this.streetlights.tilePositionX += .8;

            this.slider.body.setVelocityX(-100)
            // this.player.setVelocity(-100)
        }
        else if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.player.setVelocityY(-100);
            this.slider.body.setVelocityX(0)
        }
        else {
            this.player.setVelocityX(0);
            // this.player.anims.play('turn');

        }

    }
}