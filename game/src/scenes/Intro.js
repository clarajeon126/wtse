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


export default class Intro extends Phaser.Scene {

    constructor() {
        super({
            key: "Intro"
        })
    }


    preload() {
        this.load.image('baseboard', baseboard);
        this.load.spritesheet('nextbutton', nextbutton, { frameWidth: 22, frameHeight: 12 });
        this.load.bitmapFont(
            'font',
            fontpng,
            fontxml
        );

    }


    create() {
        let i =0;
        var clicking = true;

        this.baseboard = this.add.image(96, 54, 'baseboard')
        this.nextbutton = this.physics.add.staticSprite(120, 80, 'nextbutton').setInteractive();
        

        var text = ["welcome to \n\nwhere the sidewalk ends",
        "in this game, you'll be controlling \r\n a lanky biped who's on a mission!",
        "what this mission is you ask?",
        "of course to tell your mom [SOMETHING]",
        "press the left and right keys to time your steps",
        "the better timed your steps, the faster you can make it home!",
        "however, as you walk along the sidewalk, beware of cracks!",
        "make sure to jump over them with the space bar",
        "...who knows what'll happen otherwise"];

        this.infotext = this.add.bitmapText(50,40, 'font',text[i]).setFontSize(4)//.setOrigin(96, 54);



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
            frames: this.anims.generateFrameNumbers('nextbutton', { frames: [2,0] }),
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
        this.nextbutton.on('pointerdown', ()=> {
            
         this.nextbutton.anims.play('click', true);
            this.updateText(++i);

            if( i == 9){
                this.scene.start('Parallax');
                console.log('heyo');
            }
            
        });

        




        //scales every game object this is actually so big brain im godly 😎
        this.group = this.add.group(this.children.list)
        this.group.children.iterate((child, index) => {

            //scale everything except for graphics
            if (index != 0) {
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

        
        // this.game.scale.resize(1920,1080)

        // this.add.image(960, 520, 'baseboard').setScale(10)
        // this.add.image(1000,700, 'nextbutton').setScale(10)

        // const text = ["welcome to where the sidewalk ends",
        //     "in this game, you'll be controlling a lanky biped who's on a mission!",
        //     "what this mission is you ask?",
        //     "of course to tell your mom [SOMETHING]",
        //     "press the left and right keys to time your steps",
        //     "the better timed your steps the faster you can make it home!",
        //     "however, as you walk along the sidewalk, beware of cracks!",
        //     "make sure to jump over them with the space bar",
        //     "...who knows what'll happen otherwise"];
        // var infotext = this.add.text(20,10, text[1]);
        // // infotext.setScale(.01)
        // // infotext.setResolution(90);
        // // this.add.bitmapText(200,100, 'font', text[1])
        // // this.add.bitmapText(20, 10, 'font',text[1]).setScale(.1)
        // console.log('cool');

        // this.cursors = this.input.keyboard.createCursorKeys();
    }
    changeFrame(){
        //this.nextbutton.setFrame('hover',1);
        //this.anims.play('click', true);
        console.log('heya');

    }
    updateText(i){
        var text = ["welcome to where the sidewalk ends",
        "in this game, you'll be controlling a lanky biped who's on a mission!",
        "what this mission is you ask?",
        "of course to tell your mom [SOMETHING]",
        "press the left and right keys to time your steps",
        "the better timed your steps the faster you can make it home!",
        "however, as you walk along the sidewalk, beware of cracks!",
        "make sure to jump over them with the space bar",
        "...who knows what'll happen otherwise"];
        this.infotext.setText(text[i]);
    }
    update() {

        
        }
}