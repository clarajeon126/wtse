import Phaser from "phaser";
import baseboard from '../assets/passets/baseboard.png';
import nextbutton from "../assets/passets/nextbutton.png";
import fontpng from "../assets/Unnamed.png";
import fontxml from "../assets/Unnamed.xml";
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
        let text = ["welcome to where the sidewalk ends",
        "in this game, you'll be controlling a lanky biped who's on a mission!",
        "what this mission is you ask?",
        "of course to tell your mom [SOMETHING]",
        "press the left and right keys to time your steps",
        "the better timed your steps the faster you can make it home!",
        "however, as you walk along the sidewalk, beware of cracks!",
        "make sure to jump over them with the space bar",
        "...who knows what'll happen otherwise"];

        var i = 0;

        this.add.image(100, 54, 'baseboard');
        const nextButton = this.add.image(130,80, 'nextbutton');
        nextButton.setInteractive();

        // this.infotext = this.add.text(60,30,text[i]);
        // this.infotext.setScale('.5');

        nextButton.on('pointerdown', () =>{
            this.infotext.setText(text[++i]); 
            console.log(i);});


        this.texting = this.add.bitmapText(60,30, 'font', text[1]);
        this.texting.setScale('.05');

        console.log('cool');
        
    }

    update() {
        
       

    }
}