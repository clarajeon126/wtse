import Phaser from "phaser";
import baseboard from "../assets/passets/baseboard.png"
import mum from "../assets/passets/mother.png"


import fontpng from "../assets/minecraftia.png";
import fontxml from "../assets/minecraftia.xml";


export default class Death extends Phaser.Scene
{
    constructor ()
    {
        super({
            key: 'Death'
        });
    }

    preload ()
    {
        this.load.image('baseboard', baseboard)
        this.load.image('mum', mum)
        //load font
        this.load.bitmapFont(
            'font',
            fontpng,
            fontxml
        );
    }
      
    create ()
    {
        this.greyBg = this.add.rectangle(96,54, 192, 108, "0x000000", .5)
        //death message
        this.baseboard = this.add.image(96, 54, 'baseboard').setVisible(true)

        this.deadTitle = this.add.bitmapText(960, 220, 'font', "R.I.P.").setFontSize(70).setMaxWidth(900).setCenterAlign().setOrigin(0.5,0.5)

        this.deathText = this.add.bitmapText(750, 500, 'font', 'your mums back broke \n \n OH NO!').setFontSize(40).setMaxWidth(400)

        this.mum = this.add.image(120,55, 'mum')
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