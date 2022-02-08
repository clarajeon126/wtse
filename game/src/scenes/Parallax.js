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
        this.upSidewalk = this.add.tileSprite(96, 77, 0, 0,'upSidewalk')

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
        
        //steps always begin from right step
        this.nextStepIsRight = true


        //add texts
        this.wrongFootMsg = this.add.text(960, 540, "nope wrong foot lulz").setFontSize(40).setColor('red').setVisible(false)
        this.missedGreenMsg = this.add.text(960, 540, "yikes.. you missed. aim for the green zone!!").setFontSize(40).setColor('red').setVisible(false)


        this.showTextForASec = (text, delay) => {
            text.setVisible(true)
            this.time.addEvent({
                delay: delay,
                callback: ()=>{
                    text.setVisible(false)
                }
            })
        }

        //difficulty changers
        this.minStepSize =2
        this.sliderVelocity = 1000

        //scales every game object this is actually so big brain im godly 😎
        this.group = this.add.group(this.children.list)
        this.group.children.iterate((child, index) => {

            //scale everything except for graphics
            if(index != 0){
                console.log(child.type)

                //cause if u scale text it looks mega huge
                if(child.type != "Text"){
                    child.setScale(10, 10)
                    child.setX(child.x * 10)
                    child.setY(child.y * 10)
                }
                else {

                    //texts rnt centered in the middle but the "center" is top left so change that to middle
                    child.setOrigin(0.5, 0.5)
                }
                
            }
            //updates the physics body for all objects w physics so that the physics bodys rnt mini sized yk
            if(child.body){
                child.body.updateFromGameObject()
            } 
        });
    }

    
    update() {

        //change this for the change in parallax "distance" will be changed when changing "step size"

        var correctStepTaken = "no"        

        
        
        //to check if its the correct step
        if(Phaser.Input.Keyboard.JustDown(this.rightKey)){
            if(this.nextStepIsRight){
                correctStepTaken = "correct"
            }
            else {
                correctStepTaken = "wrong"
            }
        }
        else if( Phaser.Input.Keyboard.JustDown(this.leftKey)){
            if(!this.nextStepIsRight){
                correctStepTaken = "correct"
            }
            else {
                correctStepTaken = "wrong"
            }
        }
        else if(Phaser.Input.Keyboard.JustDown(this.spaceKey)){
            correctStepTaken = "correct"
        }


        //when space, right, or left key is tapped
        if (correctStepTaken == "correct") {
            console.log("space left or right tapped")

            
            //only run if next step is ready (in order to stop continuous key spams)
            if(this.nextStepReady) {

                //set to false; will be changed after time delay
                this.nextStepReady = false
                
                //stop slider
                this.slider.body.setVelocityX(0)

                //setting inthegreen variable
                var inTheGreen = true
                var xPos = this.slider.body.x
                //7(0 cause of 10x scale) px away from very center; center i 92 pixel
                if(xPos > 1030 || xPos < 850){
                    inTheGreen = false
                }
                

                //check if in the green zone (only moves if in the GREEENNNN else u get punished w smaller steps)
                if(inTheGreen){
                    //parallax move bg
                    this.farcity.tilePositionX += this.minStepSize;
                    this.city.tilePositionX += this.minStepSize * 2;
                    this.closecity.tilePositionX += this.minStepSize * 3;
                    this.streetlights.tilePositionX += this.minStepSize * 4;
                    this.sidewalk.tilePositionX += this.minStepSize * 4
                    this.upSidewalk.tilePositionX += this.minStepSize * 4
                    this.bushes.tilePositionX += this.minStepSize * 5

                    //move cracks
                    this.crack1.x -= minStepSize * 40;

                    //run walk anim or jump which depends on right or left step
                    if(Phaser.Input.Keyboard.JustDown(this.spaceKey)){
                        this.player.setVelocityY(-1000);
                    }
                    else if(this.nextStepIsRight) {
                        this.player.anims.play('right', true)
                        //change for the next step
                        this.nextStepIsRight = !this.nextStepIsRight
                    }
                    else {
                        this.player.anims.play('left', true)
                        //change for the nextStep
                        this.nextStepIsRight = !this.nextStepIsRight
                    }

                    this.time.addEvent({
                        delay: 400,
                        callback: ()=>{
                            this.nextStepReady = true
                            if(this.nextStepIsRight){
                                this.slider.body.setVelocityX(-1 * this.sliderVelocity)

                            }
                            else {
                                this.slider.body.setVelocityX(this.sliderVelocity)
                            }                        }
                    })
                }
                else {
                    console.log("MISSED LLLLLL")
                    this.showTextForASec(this.missedGreenMsg, 2000)
                    this.time.addEvent({
                        delay: 400,
                        callback: ()=>{
                            this.nextStepReady = true
                            if(this.nextStepIsRight){
                                this.slider.body.setVelocityX(-1 * this.sliderVelocity)

                            }
                            else {
                                this.slider.body.setVelocityX(this.sliderVelocity)
                            }                        }
                    })
                }
                
                
            }
        }
        else if (correctStepTaken == "wrong") {
            this.showTextForASec(this.wrongFootMsg, 400)
        }
        else if (correctStepTaken == "no") {

        }
    }
}