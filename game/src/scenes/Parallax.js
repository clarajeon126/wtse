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

import crack1 from "../assets/passets/crack1.png"
import crack2 from "../assets/passets/crack2.png"
import crack3 from "../assets/passets/crack3.png"
import crack4 from "../assets/passets/crack4.png"

import slider from "../assets/slider.png"
import person from "../assets/passets/peoplesprite.png"

export default class Parallax extends Phaser.Scene {

    constructor(){
        super({
            key: "Parallax"
        })
    }
    preload() {

        //load all the assets :DD
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
        this.load.image('crack1', crack1)
        this.load.image('crack2', crack2)
        this.load.image('crack3', crack3)
        this.load.image('crack4', crack4)
        this.load.spritesheet('person', person, { frameWidth: 24, frameHeight: 50});

    }

    create() {

        //parallax bg images
        this.sky = this.add.tileSprite(96, 54, 0, 0,'sky');
        this.farcity = this.add.tileSprite(96, 54, 0, 0, 'farcity');
        this.city = this.add.tileSprite(96, 54, 0, 0, 'city');
        this.closecity = this.add.tileSprite(96, 54, 0, 0, 'closecity');

        //sidewalk under (the one that has the physics)
        this.sidewalk = this.add.tileSprite(96, 88, 0,0, 'sidewalk')
        this.physics.add.existing(this.sidewalk, true); 

        //the up sidewalk
        this.upSidewalk = this.add.image(96, 77, 'upSidewalk')

        //add cracks
        this.crack1 = this.add.image(96, 84,'crack1')

        //parallax bg image in front of the sidewalk nonsense
        this.streetlights = this.add.tileSprite(96, 54, 0, 0, 'streetlights');
        this.bushes = this.add.tileSprite(96, 54, 0, 0, 'bushes');

        //slider stuff + slider physics
        this.gradiant = this.add.image(96, 95, 'gradient')
        this.slider = this.add.image(96, 90, 'slider')
        this.physics.add.existing(this.slider)
        this.slider.body.setBounce(1, 0)

        //rect for slider physics stuff
        this.leftInvisWall = this.add.rectangle(62, 95, 1, 9, 0xff0000, 1)
        this.rightInvisWall = this.add.rectangle(130, 95, 1, 9, 0xff0000, 1)
        this.bottomInvisWall = this.add.rectangle(96, 101, 68, 1, 0xff0000, 1)
        this.physics.add.existing(this.leftInvisWall, true)
        this.physics.add.existing(this.rightInvisWall, true)
        this.physics.add.existing(this.bottomInvisWall, true)

        //player add and physics!
        this.player = this.physics.add.sprite(20, 50, 'person');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        //add all the colliders
        this.physics.add.collider(this.bottomInvisWall, this.slider)    
        this.physics.add.collider(this.leftInvisWall, this.slider)
        this.physics.add.collider(this.rightInvisWall, this.slider)
        this.physics.add.collider(this.sidewalk, this.player)  

        //player animations
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

        //cursor stuff so that it only detects the first click
        this.cursors = this.input.keyboard.createCursorKeys();
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //so that u cant constantly press l/r buttons, its used in the update stuff
        this.nextStepReady = true

        //scales every game object this is actually so big brain im godly B)
        this.group = this.add.group(this.children.list)
        this.group.children.iterate((child, index) => {
            //scale everything except for graphics
            if(index != 0){
                console.log(child.type)
                child.setScale(10, 10)
                child.setX(child.x * 10)
                child.setY(child.y * 10)
            }

            //updates the physics body for all objects w physics so that the physics bodys rnt mini sized yk
            if(child.body){
                child.body.updateFromGameObject()
            } 
        });
    }

    
    update() {

        //change this for the change in parallax "distance" will be changed when changing "step size"
        var minStepSize = 2

        //when space, right, or left key is tapped
        if (Phaser.Input.Keyboard.JustDown(this.rightKey) ||
            Phaser.Input.Keyboard.JustDown(this.leftKey) ||
            Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            console.log("space left or right tapped")

            //only run if next step is ready (in order to stop continuous key spams)
            if(this.nextStepReady) {

                //set to false; will be changed after time delay
                this.nextStepReady = false
                
                //check if in the green zone

                //parallax move bg
                this.farcity.tilePositionX += minStepSize;
                this.city.tilePositionX += minStepSize * 2;
                this.closecity.tilePositionX += minStepSize * 3;
                this.streetlights.tilePositionX += minStepSize * 4;
                this.crack1.x -= minStepSize * 4;
                this.bushes.tilePositionX += minStepSize * 5

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
                        this.slider.body.setVelocityX(750)
                    }
                })
                // this.morehills.tilePositionX += 1.6;
                // this.road.tilePositionX += 3.2;
        

                // //player.x +=2;
                this.player.anims.play('right',true)
            }
        }
            //when left key pressed
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
                        this.slider.body.setVelocityX(-750)
                    }
                })
    
                this.player.anims.play('left', true)
            }
            

        }
        else if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.player.setVelocityY(-1000);
            this.slider.body.setVelocityX(0)
            this.crack1.x -= minStepSize * 20;

        }
        else if(this.cursors.up.isDown) {

            this.scene.start('Intro')
            // if(!(this.player.anims.currentAnim === 'right')){
            //     console.log("idk")
            //     this.player.anims.play('still', true)
            // }

        }
        else {
            this.player.setVelocityX(0);
        }

    }
}