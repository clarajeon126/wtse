import Phaser from "phaser";
import baseboard from '../assets/passets/baseboard.png';
import nextbutton from "../assets/passets/nextbutton.png";

export default class Text extends Phaser.Scene
{
    
    constructor(){
        super({
            key: "Text",
        })
    }

    
    preload ()
    {
        
    }


    create ()
    {
        console.log("text created")
        this.text = this.add.text(20,20, "hi")
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {

    }
}