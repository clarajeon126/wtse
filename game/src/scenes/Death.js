import Phaser from "phaser";
import baseboard from "../assets/passets/baseboard.png"
import mum from "../assets/passets/mother.png"

import restart from "../assets/passets/restart.png"
import button from "../assets/passets/button.png"

import fontpng from "../assets/minecraftia.png";
import fontxml from "../assets/minecraftia.xml";


export default class Death extends Phaser.Scene
{
    constructor ()
    {
        super({
            key: 'Death',
        });
    }

    init(data) {
        console.log('init', data);
        this.timer = data.time;
    }
    preload ()
    {
        this.load.image('baseboard', baseboard)
        this.load.image('mum', mum)

        this.load.spritesheet('button', button, { frameWidth: 30, frameHeight: 12 });

        this.load.image
        //load font
        this.load.bitmapFont(
            'font',
            fontpng,
            fontxml
        );
    }
      
    create ()
    {
        console.log(this.timer)
        this.greyBg = this.add.rectangle(96,54, 192, 108, "0x000000", .5)
        //death message
        this.baseboard = this.add.image(96, 54, 'baseboard').setVisible(true)

        this.deadTitle = this.add.bitmapText(960, 220, 'font', "R.I.P.").setFontSize(70).setMaxWidth(900).setCenterAlign().setOrigin(0.5,0.5)

        this.deathText = this.add.bitmapText(750, 500, 'font', 'your mums back broke \n \n OH NO! \n \n' + "your time: " + (this.timer ? this.timer.toFixed(1) : 0)).setFontSize(40).setMaxWidth(400)

        this.mum = this.add.image(120,55, 'mum')

        this.restartbutton = this.physics.add.staticSprite(70, 80, 'button').setInteractive();
        this.restartText = this.add.bitmapText(700, 790, 'font', "Restart" ).setFontSize(40).setMaxWidth(400)

        //restart button anims
        this.anims.create({
            key: 'hover',
            frames: this.anims.generateFrameNumbers('button', { frames: [1] }),
            frameRate: 6,
            repeat: 0
        });

        this.anims.create({
            key: 'out',
            frames: this.anims.generateFrameNumbers('button', { frames: [0] }),
            frameRate: 6,
            repeat: 0
        });

        this.anims.create({
            key: 'click',
            frames: this.anims.generateFrameNumbers('button', { frames: [2, 0] }),
            frameRate: 6,
            repeat: 0
        });

        //for restart
        //when hover 
        this.restartbutton.on('pointerover', function () {
            this.anims.play('hover', true)
        });

        //when not hovering
        this.restartbutton.on('pointerout', function () {
            this.anims.play('out', true)
        });

        //when clicking
        this.restartbutton.on('pointerdown', () => {
            this.restartbutton.anims.play('click', true)

            //reload parallax scene
            this.time.addEvent({
                delay: 400,
                callback: () => {
                    //load leaderboard
                    this.scene.start("Parallax")
                }
            })
        });

        this.leaderboardbutton = this.physics.add.staticSprite(120, 80, 'button').setInteractive();
        this.leaderboardtext = this.add.bitmapText(1200, 790, 'font', "Leaderboard" ).setFontSize(30).setMaxWidth(400)

        //for restart
        //when hover 
        this.leaderboardbutton.on('pointerover', function () {
            this.anims.play('hover', true)
        });

        //when not hovering
        this.leaderboardbutton.on('pointerout', function () {
            this.anims.play('out', true)
        });


        //when clicking
        this.leaderboardbutton.on('pointerdown', () => {
            this.leaderboardbutton.anims.play('click', true)
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
        });
    }

    update() {
        
        

    }
}