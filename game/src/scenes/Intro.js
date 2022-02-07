import Phaser from "phaser";
import baseboard from '../assets/passets/baseboard.png';
import nextbutton from "../assets/passets/nextbutton.png";
import fontpng from "../assets/pixel.png";
import fontxml from "../assets/pixel.xml";
// import fontpng from "../assets/minecraftia.png";
// import fontxml from "../assets/minecraftia.xml";
export default class Intro extends Phaser.Scene
{
    
    constructor(){
        super({
            key: "Intro"
        })
    }

    
    preload ()
    {
        this.load.image('nextbutton', nextbutton);
        this.load.image('baseboard', baseboard);
        this.load.bitmapFont(
                'font',
                fontpng,
                fontxml
              );
    }


    create ()
    {
        // let text = ["welcome to where the sidewalk ends",
        // "in this game, you'll be controlling a lanky biped who's on a mission!",
        // "what this mission is you ask?",
        // "of course to tell your mom [SOMETHING]",
        // "press the left and right keys to time your steps",
        // "the better timed your steps the faster you can make it home!",
        // "however, as you walk along the sidewalk, beware of cracks!",
        // "make sure to jump over them with the space bar",
        // "...who knows what'll happen otherwise"];

        let text = ["WELCOME TO WHERE THE SIDEWALK ENDS",
                    "IN THIS GAME YOU'LL BE PLAYING A LANKY BIPED WHO'S ON A MISSION!",
                    "WHAT IS THIS MISSION YOU ASK?",
                    "OF COURSE TO TELL YOUR MOM SOMETHING",
                     "PRESS THE LEFT AND RIGHT KEYS TO TIME YOUR STELPS",
                    "THE BETTER TIMED YOUR STEPS THE FASTER YOU CAN MAKE IT HOME!",
                    "HOWEVER, AS YOU WALK ALONG THE SIDEWALK, BEWARE OF CRACKS",
                    "MAKE SURE TO JUMP OVER THEM WITH THE SPACE BAR",
                    "WHO KNOWS WHAT'LL HAPPEN OTHERWISE"];

        var i = 0;

        this.add.image(100, 54, 'baseboard');
        const nextButton = this.add.image(130,80, 'nextbutton');
        nextButton.setInteractive();

        // this.infotext = this.add.text(60,30,text[i]);
        // this.infotext.setScale('1');

        nextButton.on('pointerdown', () =>{
            this.infotext.setText(text[++i]); 
            console.log(i);});


        this.texting = this.add.bitmapText(60,30, 'font', text[0]);
        this.texting.setScale('.5');

        console.log('cool');
        
    }

    update() {
        
       

    }
}