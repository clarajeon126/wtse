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

import statBg from "../assets/passets/stats.png"
import tipBg from "../assets/passets/tipBg.png"

import slider from "../assets/slider.png"
import person from "../assets/passets/peoplesprite.png"

import cracktilemap from "../assets/cracktilemap.png"

//font files
import fontpng from "../assets/minecraftia.png";
import fontxml from "../assets/minecraftia.xml";

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

        this.load.image('statBg', statBg)
        this.load.image('tipBg', tipBg)
        //csv that has the map created
        this.load.tilemapCSV('csv', "src/assets/crackmap.csv")

        //tiles w cracks index 0 is default
        this.load.image("crack-tiles", cracktilemap);

        this.load.spritesheet('person', person, { frameWidth: 24, frameHeight: 50});

        //load font
        this.load.bitmapFont(
            'font',
            fontpng,
            fontxml
        );
    }

    create() {
        this.tipTexts = ["welcome to where the sidewalk ends!\npress the left/right keys to walk and the A key to jump across small cracks",
                        "the moving slider has gotten faster! \nmake sure to land it in the green in order to move!",
                        "introducing,,, larger cracks! \nuse the S key to jump across medium cracks",
                        "EVEN LARGER CRACKS?!?!? \nse the D key to jump across mega-huge cracks",
                        "the ULTIMATE Challenge. \n Be Faster. Wittier. And Better. Good luck"]
        this.level = 1
        this.penalty = 0

        //parallax bg images
        this.sky = this.add.tileSprite(96, 54, 0, 0,'sky');
        this.farcity = this.add.tileSprite(96, 54, 0, 0, 'farcity');
        this.city = this.add.tileSprite(96, 54, 0, 0, 'city');
        this.closecity = this.add.tileSprite(96, 54, 0, 0, 'closecity');

        //sidewalk under (the one that has the physics)
        this.sidewalk = this.add.tileSprite(96, 88, 0,0, 'sidewalk').setDepth(1)
        this.physics.add.existing(this.sidewalk, true); 

        //the up sidewalk
        this.upSidewalk = this.add.tileSprite(96, 77, 0, 0,'upSidewalk')

        //parallax bg image in front of the sidewalk nonsense
        this.streetlights = this.add.tileSprite(96, 54, 0, 0, 'streetlights').setDepth(2)
        this.bushes = this.add.tileSprite(96, 54, 0, 0, 'bushes').setDepth(3)

        //slider stuff + slider physics
        this.gradiant = this.add.image(96, 95, 'gradient').setDepth(5)
        this.slider = this.add.image(96, 90, 'slider').setDepth(6)
        this.physics.add.existing(this.slider)
        this.slider.body.setBounce(1, 0)

        //rect for slider physics stuff
        this.leftInvisWall = this.add.rectangle(62, 95, 1, 9, 0xff0000, 1)
        this.rightInvisWall = this.add.rectangle(130, 95, 1, 9, 0xff0000, 1)
        this.bottomInvisWall = this.add.rectangle(96, 101, 68, 1, 0xff0000, 1)
        this.physics.add.existing(this.leftInvisWall, true)
        this.physics.add.existing(this.rightInvisWall, true)
        this.physics.add.existing(this.bottomInvisWall, true)

        //make group w all parallax bg objs
        this.backgroundGroup = this.add.group([this.farcity, this.city, this.closecity, this.streetlights, this.bushes])

        //so that tile layer doesnt fall of the game
        this.layerSupport = this.add.rectangle(96,97, 192,2, 0xff0000, 1)
        this.physics.add.existing(this.layerSupport, true)
        
        //add all the colliders
        this.physics.add.collider(this.bottomInvisWall, this.slider)    
        this.physics.add.collider(this.leftInvisWall, this.slider)
        this.physics.add.collider(this.rightInvisWall, this.slider)

        //player animations
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('person', {frames: [7,8]}),
            frameRate: 6,
            repeat: 0
        });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('person', { frames: [3,4] }),
            frameRate: 6,
            repeat: 0
        });

        //cursor stuff so that it only detects the first click
        this.cursors = this.input.keyboard.createCursorKeys();
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //a is small 1 tile jump; s is med 2 tile jump; d is large 3 tile jump
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

        //add texts
        this.wrongFootMsg = this.add.text(960, 540, "nope wrong foot lulz").setFontSize(40).setColor('red').setVisible(false)
        this.missedGreenMsg = this.add.text(960, 540, "yikes.. you missed. aim for the green zone!!").setFontSize(40).setColor('red').setVisible(false)
        
        this.statBg = this.add.image(140,2, "statBg")
        this.statBg.setOrigin(0,0)

        this.tipBg = this.add.image(20, 5, 'tipBg')
        this.tipBg.setOrigin(0,0)

        //info texts
        this.progressText = this.add.bitmapText(1650, 50,'font', "progress: " + "0%")
        this.timeText = this.add.bitmapText(1650, 90, 'font', "time: " + "0s")
        this.levelText = this.add.bitmapText(1650, 130, 'font', "level " + this.level)
        this.penaltyText = this.add.bitmapText(1650, 170, "font","penalty: " + this.penalty)
        this.newLevelTipText = this.add.text(700, 110,this.tipTexts[this.level - 1]).setFontSize(28).setWordWrapWidth(800)
        this.statTexts = this.add.group([this.progressText, this.timeText, this.levelText, this.penaltyText])
        
        this.statTexts.children.iterate((text, index) => {
            text.setFontSize(25)
            text.setOrigin(0,0)
        })

        this.showTextForASec = (text, delay) => {
            text.setVisible(true)
            this.time.addEvent({
                delay: delay,
                callback: ()=>{
                    text.setVisible(false)
                }
            })
        }

        

        //scales every game object this is actually so big brain im godly 😎
        this.group = this.add.group(this.children.list)
        this.group.children.iterate((child, index) => {

            //scale everything except for graphics
            if(index != 0){
                console.log(child.type)

                //cause if u scale text it looks mega huge
                if(child.type != "Text" && child.type != "BitmapText"){
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

        

        // make tile map from csv
        this.map = this.make.tilemap({ key: 'csv', tileWidth: 80, tileHeight: 220 });
        this.tiles = this.map.addTilesetImage("crack-tiles");
        this.layer = this.map.createLayer(0, this.tiles, 0, 740).setDepth(2)
        
        //player add and physics! begin one tile away created later cause not scaled
        this.player = this.physics.add.sprite(100, 0, 'person').setDepth(2)
        this.player.setOrigin(0,0)
        this.player.setScale(8.33) //200(width) x 416.66
        this.player.setCollideWorldBounds(true);

        

        this.physics.add.collider(this.sidewalk, this.player)  

        //variables
            //variables from the smooth move of parallax bg
            this.isJumping = false
            this.isInStep = false

            //so that u cant constantly press l/r buttons, its used in the update stuff
            this.nextStepReady = true
            
            //steps always begin from right step to control that the person doesnt do the same step twice
            this.nextStepIsRight = true

            //num of tiles traveled
            this.distance = 1

            this.newLevelTipShowing = true

            //difficulty changer 1-1000; 2-1200; 3-1225; 4-1250; 5-1400
            this.sliderVelocity = 1000

            //if dead will change this variable and wont run any of the stuff inside update
            this.isOnDeathMsg = false

            this.isOnCongratsMsg = false

            this.isOnPauseMsg = false

            this.isOnTutorialMsg = true
        
        //is run when player touches sidewalk
        this.physics.add.overlap(this.player, this.layer, function(thePlayer, tile) {

            //dont run if on the death msg and is currently in the air jumping
            if(!this.isOnDeathMsg && !this.isJumping){
                //gets all the tiles (usually 3) that the player obj is touching
                var tilesPlayerIsTouching = this.layer.getTilesWithinWorldXY(100,740, 200, 220)
                tilesPlayerIsTouching.every((tile) => {
                    //0 is the default base one w/o any cracks
                    if(tile.index != 0){
                        //died!!!
                        this.isOnDeathMsg = true
                        this.scene.launch("Death", { time: this.currentTime })
                        return false;
                    }
                    return true;
                })
            }
        }, null, this);


        //so that cracks dont collapse and fall :D
        this.physics.add.existing(this.layer)
        this.physics.add.collider(this.layer, this.layerSupport)

        //timer for scoring
        this.currentTime = 0.0
        this.start1msTimer = () => {
            this.runningTimer = this.time.addEvent({
                delay:100, 
                callback: () => {
                    this.currentTime += .1
                    this.start1msTimer()
            }})
        }
        this.start1msTimer()

        this.minStepSize = .5
    }

    update() {

        //change this for the change in parallax "distance" will be changed when changing "step size"
        var correctStepTaken = "no"        
        var jumpTapped = "no"
        

        //so functions rnt run from keyboard taps in diff scenes!
        if(this.isOnDeathMsg){
            console.log("DEAD")
            return
        }

        //update progress text
        var progressNum = ((this.distance + 1.0) / 250.00 ) * 100.00
        this.progressText.setText("progress: " + progressNum.toFixed(2) + "%")


        //update penalty text
        this.penaltyText.setText("penalty: " + this.penalty)
        if(this.distance >= 249){
            //user completed game
            console.log("GAME COMPLETED LES GOOO")
        }
        //deal with level display changes
        console.log(this.distance)
        var notInCorrectLevel = (this.level) * 50 <= this.distance

        if(notInCorrectLevel){
            //correct the level
            this.level += 1
            this.levelText.setText("level " + this.level)

            var newSky = ""
            var new3Back = ""
            var new2Back = ""
            var new1Back = ""
            var new2Front = ""
            var new1Front = ""
            
            //display new text
            this.newLevelTipText.setVisible(true).setText(this.tipTexts[this.level - 1])
            this.tipBg.setVisible(true)
            this.newLevelTipShowing = true

            //change images depending on level
            if(this.level == 2){
                newSky = ""
                new3Back = ""
                new2Back = ""
                new1Back = ""
                new2Front = ""
                new1Front = ""
                this.sliderVelocity = 1200
            }
            else if(this.level == 3){
                newSky = ""
                new3Back = ""
                new2Back = ""
                new1Back = ""
                new2Front = ""
                new1Front = ""
                this.sliderVelocity = 1225
            }
            else if(this.level == 4){
                newSky = ""
                new3Back = ""
                new2Back = ""
                new1Back = ""
                new2Front = ""
                new1Front = ""
                this.sliderVelocity = 1250
            }
            else if(this.level == 5){
                newSky = ""
                new3Back = ""
                new2Back = ""
                new1Back = ""
                new2Front = ""
                new1Front = ""
                this.sliderVelocity = 1400
            }

            //change image depending on levelLl
            this.sky.setTexture(newSky)
            this.farcity.setTexture(new3Back)
            this.city.setTexture(new2Back)
            this.closecity.setTexture(new1Back)
            this.streetlights.setTexture(new2Front)
            this.bushes.setTexture(new1Front)
        }

        //to change timer text
        this.timeText.setText("time: " + this.currentTime.toFixed(1) + "s")

        //for nice smooth parallax bg moving
        if(this.isInStep) {
            console.log('in STEPPPP')
            //parallax move bg
            this.minStepSize = .5
                    this.farcity.tilePositionX += this.minStepSize;
                    this.city.tilePositionX += this.minStepSize * 2;
                    this.closecity.tilePositionX += this.minStepSize * 3;
                    this.streetlights.tilePositionX += this.minStepSize * 4;
                    this.upSidewalk.tilePositionX += this.minStepSize * 4
                    this.bushes.tilePositionX += this.minStepSize * 5
        }
        if(this.isJumping) {
            console.log('in JUMPPP')
            //parallax move bg
            this.minStepSize = .5
                    this.farcity.tilePositionX += this.minStepSize;
                    this.city.tilePositionX += this.minStepSize * 2;
                    this.closecity.tilePositionX += this.minStepSize * 3;
                    this.streetlights.tilePositionX += this.minStepSize * 4;
                    this.upSidewalk.tilePositionX += this.minStepSize * 4
                    this.bushes.tilePositionX += this.minStepSize * 5
        }
        
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
        else if(Phaser.Input.Keyboard.JustDown(this.aKey)){
            jumpTapped = "a"
            correctStepTaken = "correct"
        }
        else if(Phaser.Input.Keyboard.JustDown(this.sKey)){
            jumpTapped = "s"
            correctStepTaken = "correct"
        }
        else if(Phaser.Input.Keyboard.JustDown(this.dKey)){
            jumpTapped = "d"
            correctStepTaken = "correct"
        }


        //when jump, right, or left key is tapped
        if (correctStepTaken == "correct") {
            console.log("jump left or right tapped")

            //if tip is shown make it go away
            if(this.newLevelTipShowing){
                this.newLevelTipShowing = false
                this.newLevelTipText.setVisible(false)
                this.tipBg.setVisible(false)
            }

            //only run if next step is ready (in order to stop continuous key spams)
            if(this.nextStepReady) {

                //set to false; will be changed after time delay
                this.nextStepReady = false
                
                //stop slider
                this.slider.body.setVelocityX(0)

                //setting inthegreen variable
                var inTheGreen = true
                var xPos = this.slider.body.x

                //penalty stuff
                var fromCenter = Math.abs(xPos - 960) / 10

                console.log(fromCenter)
                if(fromCenter <= 3){
                    this.penalty -= 1
                    
                }
                else if(fromCenter <= 7){
                    this.penalty -= 0.5
                }
                else if(fromCenter <= 11){
                    //no points added or removed
                }
                else if(fromCenter <= 18){
                    this.penalty += .25
                    inTheGreen = false
                }
                else if(fromCenter <= 25){
                    this.penalty += .5
                    inTheGreen = false
                }
                else{
                    this.penalty += .1
                    inTheGreen = false
                }
                

                //check if in the green zone (only moves if in the GREEENNNN else u get punished w smaller steps)
                if(inTheGreen){

                    //run walk anim or jump which depends on right or left step
                    if(jumpTapped != "no"){
                        console.log("jump")

                        this.player.setVelocityY(-1000)

                        if(jumpTapped == "a"){
                            this.layer.body.setVelocityX(-160)
                            this.distance += 4
                        }
                        else if (jumpTapped == "s"){
                            this.layer.body.setVelocityX(-200)
                            this.distance += 5
                        }
                        else if(jumpTapped == "d") {
                            this.layer.body.setVelocityX(-240)
                            this.distance += 6
                        }

                        this.isJumping = true
                        this.time.addEvent({
                            delay: 2000,
                            callback:() => {
                                
                                this.layer.body.setVelocityX(0)
                                this.isJumping = false
                            }
                        })
                    }
                    else if(this.nextStepIsRight) {
                        this.isInStep = true
                        this.player.anims.play('right', true)
                        this.distance += 1
                        //change for the next step
                        this.nextStepIsRight = !this.nextStepIsRight

                        //move cracks
                        this.layer.x -= 80
                    }
                    else {
                        this.isInStep = true
                        this.player.anims.play('left', true)
                        this.distance += 1

                        //change for the nextStep
                        this.nextStepIsRight = !this.nextStepIsRight

                        //move cracks
                        this.layer.x -= 80
                    }

                    this.time.addEvent({
                        delay: (jumpTapped != "no" ? 2000 : 400),
                        callback: ()=>{
                            this.isInStep = false
                            this.nextStepReady = true
                            if(!this.isOnDeathMsg){
                                if(this.nextStepIsRight){
                                    this.slider.body.setVelocityX(-1 * this.sliderVelocity)

                                }
                                else {
                                    this.slider.body.setVelocityX(this.sliderVelocity)
                                }  
                            }                         
                        }
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