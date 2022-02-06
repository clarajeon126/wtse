import Phaser from "phaser";
import baseboard from '../assets/passets/baseboard.png';
import nextbutton from "../assets/passets/nextbutton.png";

export default class Intro extends Phaser.Scene
{
    
    constructor ()
    {
        super();
    }

    
    preload ()
    {
        this.load.image('nextbutton', nextbutton);
        this.load.image('baseboard', baseboard);
        this.game.load.bitmapFont(
            'font',
            'assets/font.png',
            'assets/font.xml'
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
        var infoText = this.add.bitmapText(200, 100, 'font', text[1], 2);
        
    }

    update() {
        
       

    }
}