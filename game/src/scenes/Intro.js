import Phaser from "phaser";
import baseboard from '../assets/passets/baseboard.png';
import nextbutton from "../assets/passets/nextbutton.png";
import fontpng from "../assets/font.png";
import fontxml from "../assets/font.xml";

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
        // this.load.bitmapFont(
        //     'font',
        //     fontpng,
        //     fontxml
        //   );
        this.load.bitmapFont(
                'font',
                fontpng,
                fontxml
              );
    }


    create ()
    {
        this.add.image(100, 54, 'baseboard');
        this.add.image(130,80, 'nextbutton');

        const text = ["welcome to where the sidewalk ends",
            "in this game, you'll be controlling a lanky biped who's on a mission!",
            "what this mission is you ask?",
            "of course to tell your mom [SOMETHING]",
            "press the left and right keys to time your steps",
            "the better timed your steps the faster you can make it home!",
            "however, as you walk along the sidewalk, beware of cracks!",
            "make sure to jump over them with the space bar",
            "...who knows what'll happen otherwise"];
        var infotext = this.add.text(20,10, text[1]);
        infotext.setScale('.8');
        //this.add.bitmapText(20, 10, 'font',text[1]);
        console.log('cool');
        
    }

    update() {
        
       

    }
}