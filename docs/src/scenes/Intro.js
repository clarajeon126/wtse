import Phaser from "phaser";
import fontpng from "../assets/minecraftia.png";
import fontxml from "../assets/minecraftia.xml";
import baseboard from '../assets/passets/baseboard.png';
import intro from "../assets/passets/intro.png";
import nextbutton from "../assets/passets/nextbutton.png";
import homebutton from "../assets/passets/home.png";
import resumebutton from "../assets/passets/resumebutton.png";
import pausebutton from "../assets/passets/pausebutton.png";
import restartbutton from "../assets/passets/restart.png";
import playbutton from "../assets/passets/playbutton.png";

import background from "../assets/bgmain.png"
export default class Intro extends Phaser.Scene {

    constructor() {
        super({
            key: "Intro"
        })
    }

    preload() {
        this.load.image('baseboard', baseboard);
        this.load.spritesheet('nextbutton', nextbutton, { frameWidth: 22, frameHeight: 12 });
        this.load.spritesheet('playbutton', playbutton, { frameWidth: 21, frameHeight: 11 });
        this.load.image('intro', intro);

        this.load.spritesheet('background',background, {frameWidth: 192, frameHeight: 108} )
        this.load.bitmapFont(
            'font',
            fontpng,
            fontxml
        );
    }

    create() {
        
        let i = 0;
        this.online = false;
        this.text = ["welcome to \n\nwhere the sidewalk ends",
            "in this game, you'll be controlling \r\n a lanky biped who's on a mission!",
            "what this mission is you ask?",
            "of course to tell your mom how much you <3 her",
            "press the left and right keys to time your steps",
            "the better timed your steps, the faster you can make it home!",
            "however, as you walk along the sidewalk, beware of cracks!",
            "make sure to jump over them with the A, S, or D key. And time your key taps in the green zone! If you miss it, your total time will go up! Less your time is the better!",
            "...who knows what'll happen otherwise"];


        //for bg anims
        this.restartbutton = this.add.sprite(96, 54, 'background').setAlpha(.5)
        this.anims.create({
            key: 'runbg',
            frames: this.anims.generateFrameNumbers('background', { frames: [0,1,2,3,4] }),
            frameRate: 1,
            repeat: -1
        });
        this.restartbutton.anims.play('runbg')


        //add intro playbutton and baseboard but baseboard is not visible yet
        this.intro = this.add.image(96, 54, 'intro')
        this.baseboard = this.add.image(96, 54, 'baseboard').setVisible(false)
        this.playbutton = this.physics.add.staticSprite(120, 80, 'playbutton').setInteractive();
        this.nextbutton = this.physics.add.staticSprite(120, 80, 'playbutton').setInteractive().setVisible(false)

        //play button anims
        this.anims.create({
            key: 'hoverp',
            frames: this.anims.generateFrameNumbers('playbutton', { frames: [1] }),
            frameRate: 6,
            repeat: 0
        });

        this.anims.create({
            key: 'outp',
            frames: this.anims.generateFrameNumbers('playbutton', { frames: [0] }),
            frameRate: 6,
            repeat: 0
        });

        this.anims.create({
            key: 'clickp',
            frames: this.anims.generateFrameNumbers('playbutton', { frames: [2, 0] }),
            frameRate: 6,
            repeat: 0
        });

        //for play button hover anims!!!
        //when hover 
        this.playbutton.on('pointerover', function () {
            this.anims.play('hoverp', true)
        });

        //when not hovering
        this.playbutton.on('pointerout', function () {
            this.anims.play('outp', true)
        });

        //when clicking
        this.playbutton.on('pointerdown', () => {
            this.playbutton.anims.play('clickp', true)

            //delay just for aesthetics yk so we get a tinyy delay
            
                    //add the instructions pages
                    this.baseboard.setVisible(true)
                    this.nextbutton.setVisible(true)
                    this.infotext = this.add.bitmapText(960, 540, 'font', this.text[i]).setFontSize(40).setMaxWidth(900).setCenterAlign().setOrigin(0.5,0.5)
                    this.introTitleText = this.add.bitmapText(960, 220, 'font', "intro").setFontSize(70).setMaxWidth(900).setCenterAlign().setOrigin(0.5,0.5)

                    //destroy the intro n play
                    this.intro.destroy();
                    this.playbutton.destroy();
                    
                    //for other create structures
                    this.online = true;
            
        });

        //next button anims
        this.anims.create({
            key: 'hover',
            frames: this.anims.generateFrameNumbers('nextbutton', { frames: [1] }),
            frameRate: 6,
            repeat: 0
        });

        this.anims.create({
            key: 'out',
            frames: this.anims.generateFrameNumbers('nextbutton', { frames: [0] }),
            frameRate: 6,
            repeat: 0
        });

        this.anims.create({
            key: 'click',
            frames: this.anims.generateFrameNumbers('nextbutton', { frames: [2, 0] }),
            frameRate: 6,
            repeat: 0
        });

        //when hover 
        this.nextbutton.on('pointerover', function () {
            console.log('pls work');
            this.anims.play('hover', true)
        });

        //when not hovering
        this.nextbutton.on('pointerout', function () {
            this.anims.play('out', true)
        });

        //when clicking
        this.nextbutton.on('pointerdown', () => {
            this.nextbutton.anims.play('click', true)
            ++i

            this.infotext.setText(this.text[i])


            if (i == 9) {
                this.scene.stop('Intro')
                this.scene.start('Parallax');
                console.log('heyo');
            }
        });

        //scales every game object this is actually so big brain im godly 😎
        this.group = this.add.group(this.children.list)
        this.group.children.iterate((child, index) => {

            //scale everything except for graphics
            if (true) {
                console.log(child.type)

                //cause if u scale text it looks mega huge
                if (child.type != "Text") {
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
            if (child.body) {
                child.body.updateFromGameObject()
            }
        });
    }
    update() {
        // if (this.online == true) {
            
        // }

    }
}