import Phaser from "phaser";
import mountain from "../assets/passets/mountain.png";
import darktrees from "../assets/passets/darktrees.png";
import lighttrees from "../assets/passets/lighttrees.png";
import hills from "../assets/passets/hills.png";
import morehills from "../assets/passets/morehills.png";
import road from "../assets/passets/road.png";
import sidewalk from "../assets/passets/sidewalk.png";
import person from "../assets/passets/person.png";
import sky from "../assets/passets/sky.png"
export default class Parallax extends Phaser.Scene {

    preload() {
            this.load.image('sky', sky);
            this.load.image('mountain', mountain);
            this.load.image('darktrees', darktrees);
            this.load.image('lighttrees', lighttrees);
            this.load.image('hills', hills);
            this.load.image('morehills', morehills);
            this.load.image('road', road);
            this.load.image('sidewalk', sidewalk);
            this.load.spritesheet('person', person, { frameWidth: 360, frameHeight: 450 });
    }

    create() {
        this.sky = this.add.tileSprite(1024, 512, 512, 256, 'sky');
        this.sky.setScale(4);
        this.mountain = this.add.tileSprite(1024, 512, 512, 256, 'mountain');
        this.mountain.setScale(4);
        this.darktrees = this.add.tileSprite(1024, 512, 512, 256, 'darktrees');
        this.darktrees.setScale(4);
        this.lighttrees = this.add.tileSprite(1024, 512, 512, 256, 'lighttrees');
        this.lighttrees.setScale(4);
        this.hills = this.add.tileSprite(1024, 512, 512, 256, 'hills');
        this.hills.setScale(4);
        this.morehills = this.add.tileSprite(1024, 512, 512, 256, 'morehills');
        this.morehills.setScale(4);
        this.road = this.add.tileSprite(1024, 512, 512, 256, 'road');
        this.road.setScale(4);


        this.sidewalk = this.physics.add.staticGroup();
        this.sidewalk.create(1024, 800, 'sidewalk');

        this.player = this.physics.add.sprite(100, 450, 'person');

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('person', { start: 0, end: 2 }),
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('person', { start: 0, end: 4 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'person', frame: 5 }],
            frameRate: 20,
        });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.player, this.sidewalk);
    }

    update() {
        if (this.cursors.right.isDown) {
            this.mountain.tilePositionX += .1;
            this.darktrees.tilePositionX += .2;
            this.lighttrees.tilePositionX += .4;
            this.hills.tilePositionX += .8;
            this.morehills.tilePositionX += 1.6;
            this.road.tilePositionX += 3.2;
    

            //player.x +=2;
            this.player.anims.play('right', true);
        }
        else if (this.cursors.space.isDown) {
            this.player.setVelocity(-100)
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');

        }

    }
}