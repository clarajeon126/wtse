import Phaser from "phaser";
import baseboard from "../assets/passets/baseboard.png"

import buttonplain from "../assets/passets/button.png"

import fontpng from "../assets/minecraftia.png";
import fontxml from "../assets/minecraftia.xml";
import background from "../assets/bgmain.png"

import congrats from "../assets/passets/congratspic.png"
export default class Congrat extends Phaser.Scene
{
    constructor ()
    {
        super({
            key: 'Congrat',
        });
    }

    init(data) {
        console.log('init', data);
        this.score = data.score;
    }
    preload ()
    {
        this.load.html("form", "src/scenes/name.html");
        this.load.image('baseboard', baseboard)
        this.load.image('congrat', congrats)
        this.load.spritesheet('background',background, {frameWidth: 192, frameHeight: 108} )
        this.load.spritesheet('button', buttonplain, { frameWidth: 30, frameHeight: 12 });

        //load font
        this.load.bitmapFont(
            'font',
            fontpng,
            fontxml
        );
    }
      
    create ()
    {
        console.log(this.timer + "timerrr")
        //for bg anims
        this.background = this.add.sprite(96, 54, 'background').setAlpha(.5)
        this.anims.create({
            key: 'runbg',
            frames: this.anims.generateFrameNumbers('background', { frames: [0,1,2,3,4] }),
            frameRate: 1,
            repeat: -1
        });

        this.background.anims.play('runbg')


        this.greyBg = this.add.rectangle(96,54, 192, 108, "0x000000", .5)
        //death message
        this.baseboard = this.add.image(96, 54, 'baseboard').setVisible(true)
        
        this.deadTitle = this.add.bitmapText(960, 220, 'font', "LES GO!").setFontSize(70).setMaxWidth(900).setCenterAlign().setOrigin(0.5,0.5)

        this.img = this.add.image(122,45, 'congrat')
        this.deathText = this.add.bitmapText(750, 440, 'font', "you made it to the end of the sidewalk!! \n your time: " + (this.score) + "\n put your name below to save your time!").setFontSize(40).setMaxWidth(400).setDepth(100)

        
        
            this.restartbutton = this.physics.add.staticSprite(70, 80, 'button').setInteractive();
            this.restartText = this.add.bitmapText(700, 790, 'font', "Restart" ).setFontSize(40).setMaxWidth(400)

        //restart button anims
        this.anims.create({
            key: 'hoverplain',
            frames: this.anims.generateFrameNumbers('button', { frames: [1] }),
            frameRate: 6,
            repeat: 0
        });

        this.anims.create({
            key: 'outplain',
            frames: this.anims.generateFrameNumbers('button', { frames: [0] }),
            frameRate: 6,
            repeat: 0
        });

        this.anims.create({
            key: 'clickplain',
            frames: this.anims.generateFrameNumbers('button', { frames: [2, 0] }),
            frameRate: 6,
            repeat: 0
        });

        //for restart
        //when hover 
        this.restartbutton.on('pointerover', function () {
            this.anims.play('hoverplain', true)
        });

        //when not hovering
        this.restartbutton.on('pointerout', function () {
            this.anims.play('outplain', true)
        });

        //when clicking
        this.restartbutton.on('pointerdown', () => {
            this.restartbutton.anims.play('clickplain', true)

            //reload parallax scene
            this.time.addEvent({
                delay: 400,
                callback: () => {
                    //load leaderboard
                    console.log("idrk")
                    this.scene.start("Parallax")
                }
            })
        });

        this.leaderboardbutton = this.physics.add.staticSprite(120, 80, 'button').setInteractive();
        this.leaderboardtext = this.add.bitmapText(1200, 790, 'font', "Leaderboard" ).setFontSize(30).setMaxWidth(400)

        //for restart
        //when hover 
        this.leaderboardbutton.on('pointerover', function () {
            this.anims.play('hoverplain', true)
        });

        //when not hovering
        this.leaderboardbutton.on('pointerout', function () {
            this.anims.play('outplain', true)
        });


        //when clicking
        this.leaderboardbutton.on('pointerdown', () => {
            this.leaderboardbutton.anims.play('clickplain', true)
            this.time.addEvent({
                delay: 400,
                callback: () => {
                    //load leaderboard
                    this.scene.start("Leaderboard")
                }
            })
            
        });

        
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

            this.img.setScale(5)
        });

        let width = window.innerWidth
        let height = window.innerHeight
        this.nameInput = this.add.dom(width * .37, height*.605).createFromCache("form").setDepth(2)

        this.submitbutton = this.physics.add.staticSprite(1000, 650, 'button').setInteractive().setScale(6)
        this.submitText = this.add.bitmapText(1000, 640, 'font', "Submit" ).setFontSize(35).setMaxWidth(180)
        this.submitText.setOrigin(0.5,0.5)
        
        //for submitting name
        //when hover 
        this.submitbutton.on('pointerover', function () {
            this.anims.play('hoverplain', true)
        });

        //when not hovering
        this.submitbutton.on('pointerout', function () {
            this.anims.play('outplain', true)
        });


        //when clicking
        this.submitbutton.on('pointerdown', () => {
            this.submitbutton.anims.play('clickplain', true)
            this.time.addEvent({
                delay: 400,
                callback: () => {

                    let name = this.nameInput.getChildByName("name");
                    if(name.value != "") {
                        console.log(name.value)
                        this.scene.start("Leaderboard", {name: name.value, score: this.score})
                        name.value = "";
                    }
                    //load leaderboard
                }
            })
            
        });
    }

    update() {
        
        

    }
}