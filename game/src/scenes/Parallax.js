import Phaser from "phaser";
import bushes from "../assets/passets/bushes.png";
import city from "../assets/passets/city.png";
import closecity from "../assets/passets/closecity.png";
import farcity from "../assets/passets/farcity.png";
import sidewalk from "../assets/passets/sidewalk.png";
import sky from "../assets/passets/sky.png";
import streetlights from "../assets/passets/streetlights.png";
// import background from "../assets/passets/b.png";
// import person from "../assets/passets/sky.png"
export default class Parallax extends Phaser.Scene {

    preload() {
            this.load.image('bushes', bushes);
            this.load.image('city', city);
            this.load.image('closecity', closecity);
            this.load.image('farcity', farcity);
            this.load.image('sidewalk', sidewalk);
            this.load.image('sky', sky);
            this.load.image('streetlights', streetlights);
            // this.load.spritesheet('person', person, { frameWidth: 360, frameHeight: 450 });
    }

    create() {
        //this.sky = this.add.image(96,54,'sky')
        this.sky = this.add.tileSprite(96,54, 192, 108,'sky');
        // this.sky.setScale(4);
        this.farcity = this.add.tileSprite(96, 54, 0, 0, 'farcity');
        // this.mountain.setScale(4);
        this.city = this.add.tileSprite(96, 54, 0, 0, 'city');
        // this.darktrees.setScale(4);
        this.closecity = this.add.tileSprite(96, 54, 0, 0, 'closecity');
        // this.lighttrees.setScale(4);
        this.sidewalk = this.add.tileSprite(96, 54, 0, 0, 'sidewalk');
        // this.hills.setScale(4);
        this.streetlights = this.add.tileSprite(96, 54, 0, 0, 'streetlights');
        // this.morehills.setScale(4);
        this.bushes = this.add.tileSprite(96, 54, 0, 0, 'bushes');
        // this.road.setScale(4);


        // this.sidewalk = this.physics.add.staticGroup();
        // this.sidewalk.create(96, 800, 'sidewalk');

        // this.player = this.physics.add.sprite(100, 450, 'person');

        // this.player.setBounce(0.2);
        // this.player.setCollideWorldBounds(true);

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
        // this.physics.add.collider(this.player, this.sidewalk);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.rightKey)) {
            this.farcity.tilePositionX += .1;
            this.city.tilePositionX += .2;
            this.closecity.tilePositionX += .4;
            this.streetlights.tilePositionX += .8;
            // this.morehills.tilePositionX += 1.6;
            // this.road.tilePositionX += 3.2;
    

            // //player.x +=2;
            // this.player.anims.play('right', true);
        }
        else if (this.cursors.space.isDown) {
            // this.player.setVelocity(-100)
        }
        else {
            // this.player.setVelocityX(0);
            // this.player.anims.play('turn');

        }

    }
}