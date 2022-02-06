import Phaser from "phaser";
import bushes from "../assets/passets/bushes.png";
import city from "../assets/passets/city.png";
import closecity from "../assets/passets/closecity.png";
import farcity from "../assets/passets/farcity.png";
import sidewalk from "../assets/passets/sidewalkfront.png";
import sky from "../assets/passets/sky.png";
import streetlights from "../assets/passets/streetlights.png";
import gradient from "../assets/passets/gradientlight.png";
import upSidewalk from "../assets/passets/sidewalkbehind.png";

// import background from "../assets/passets/b.png";
import slider from "../assets/slider.png"
import person from "../assets/passets/peoplesprite.png"
export default class Parallax extends Phaser.Scene {

    preload() {
            this.load.image('bushes', bushes);
            this.load.image('city', city);
            this.load.image('closecity', closecity);
            this.load.image('farcity', farcity);
            this.load.image('sidewalk', sidewalk);
            this.load.image('upSidewalk', upSidewalk)
            this.load.image('sky', sky);
            this.load.image('streetlights', streetlights);
            this.load.image('gradient', gradient)
            this.load.image('slider', slider)
            this.load.spritesheet('person', person, { frameWidth: 24, frameHeight: 50});
    }

    create() {

        //parallax bg images
        this.sky = this.add.tileSprite(96,54, 192, 108,'sky');
        this.farcity = this.add.tileSprite(96, 54, 0, 0, 'farcity');
        this.city = this.add.tileSprite(96, 54, 0, 0, 'city');
        this.closecity = this.add.tileSprite(96, 54, 0, 0, 'closecity');
        this.sidewalk = this.add.image(96, 88, 'sidewalk')
        this.upSidewalk = this.add.image(96, 77, 'upSidewalk')
        this.streetlights = this.add.tileSprite(96, 54, 0, 0, 'streetlights');
        this.bushes = this.add.tileSprite(96, 54, 0, 0, 'bushes');
        this.gradiant = this.add.image(96, 95, 'gradient')
        this.slider = this.add.image(96, 90, 'slider')

        //slider physics!
        this.physics.add.existing(this.slider)
        this.slider.body.setBounce(1, 0)

        this.leftInvisWall = this.add.rectangle(62, 95, 1, 9, 0xff0000, 1)
        this.rightInvisWall = this.add.rectangle(130, 95, 1, 9, 0xff0000, 1)
        this.bottomInvisWall = this.add.rectangle(96, 101, 68, 1, 0xff0000, 1)

        this.physics.add.existing(this.leftInvisWall, true)
        this.physics.add.existing(this.rightInvisWall, true)
        this.physics.add.existing(this.bottomInvisWall, true)

        // this.sidewalk = this.physics.add.staticGroup();
        // this.sidewalk.create(96, 54, 'sidewalk');

        
        this.physics.add.existing(this.sidewalk, true);  

        this.physics.add.collider(this.bottomInvisWall, this.slider)    
        this.physics.add.collider(this.leftInvisWall, this.slider)
        this.physics.add.collider(this.rightInvisWall, this.slider)

        this.player = this.physics.add.sprite(20, 50, 'person');
        
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.physics.add.collider(this.sidewalk, this.player)  
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('person', {frames: [7,8,9]}),
            frameRate: 6,
            repeat: 0
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('person', { frames: [3,4,9] }),
            frameRate: 6,
            repeat: 0
        });

        this.anims.create({
            key: 'still',
            frames: [{ key: 'person', frame: 9 }],
            frameRate: 20,
        });

        this.cursors = this.input.keyboard.createCursorKeys();
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        // this.player.anims.play('right')
        // this.physics.add.collider(this.player, this.sidewalk);

        this.nextStepReady = true

    }

    
    update() {
        var minStepSize = 2

        if (Phaser.Input.Keyboard.JustDown(this.rightKey)) {

            if(this.nextStepReady) {
                this.nextStepReady = false
                //parallax move
                this.farcity.tilePositionX += minStepSize;
                this.city.tilePositionX += minStepSize * 2;
                this.closecity.tilePositionX += minStepSize * 4;
                this.streetlights.tilePositionX += minStepSize * 8;
                this.bushes.tilePositionX += minStepSize * 16

                //stop slider
                this.slider.body.setVelocityX(0)
                var xPos = this.slider.body.x


                //7 px away from very center
                if(xPos >103 ||xPos < 85){
                    console.log("MISSED LLLLLL")
                }
                console.log("right walk " + xPos)
                this.time.addEvent({
                    delay: 400,
                    callback: ()=>{
                        this.nextStepReady = true
                        this.slider.body.setVelocityX(75)
                    }
                })
                // this.morehills.tilePositionX += 1.6;
                // this.road.tilePositionX += 3.2;
        

                // //player.x +=2;
                this.player.anims.play('right',true)
            }
            
        }
        else if (Phaser.Input.Keyboard.JustDown(this.leftKey)) {

            if(this.nextStepReady) {
                this.nextStepReady = false

                this.farcity.tilePositionX += minStepSize;
                this.city.tilePositionX += minStepSize * 2;
                this.closecity.tilePositionX += minStepSize * 4;
                this.streetlights.tilePositionX += minStepSize * 8;
                this.bushes.tilePositionX += minStepSize * 16
                var xPos = this.slider.body.x
    
    
                //7 px away from very center
                if(xPos > 103 || xPos < 85){
                    console.log("MISSED LLLLLL")
                }
                //stop slider
                this.slider.body.setVelocityX(0)
                console.log("left walk " + this.slider.body.x)
                this.time.addEvent({
                    delay: 400,
                    callback: ()=>{
                        this.nextStepReady = true
                        this.slider.body.setVelocityX(-75)
                    }
                })
    
                this.player.anims.play('left', true)
            }
            

        }
        else if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.player.setVelocityY(-100);
            this.slider.body.setVelocityX(0)
        }
        else {
            this.player.setVelocityX(0);
            // if(!(this.player.anims.currentAnim === 'right')){
            //     console.log("idk")
            //     this.player.anims.play('still', true)
            // }

        }

    }
}