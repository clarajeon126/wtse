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
        let canvas = document.querySelector("canvas");

        // canvas.style.width = 192 + "px";
        // canvas.style.height = 108 + "px";

        this.game.scale.resize(1920,1080)
        window.postMessage("hi")
        // this.scale.resize(1000,100)
        // let canvas = document.querySelector("canvas");
        // let width = window.innerWidth;
        // let height = window.innerHeight;
        // let wratio = width / height;
        // let ratio = 192/ 108;
        // if (wratio < ratio) {
        //     canvas.style.width = width + "px";
        //     canvas.style.height = (width * ratio) + "px";
            
        // } else {
        //     canvas.style.width = (height / ratio) + "px";
        //     canvas.style.height = height + "px";
        // }

        this.add.image(960, 520, 'baseboard').setScale(10)
        this.add.image(1000,700, 'nextbutton').setScale(10)

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
        // infotext.setScale(.01)
        // infotext.setResolution(90);
        // this.add.bitmapText(200,100, 'font', text[1])
        // this.add.bitmapText(20, 10, 'font',text[1]).setScale(.1)
        console.log('cool');
        
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
       if(this.cursors.down.isDown){
           window.postMessage("hiii")
       }

    }
}