import Phaser from "phaser";
import baseboard from '../assets/passets/baseboard.png';
import nextbutton from "../assets/passets/nextbutton.png";

import cracktilemap from "../assets/cracktilemap.png"

import mario from "../assets/mario_tiles.png"
export default class Text extends Phaser.Scene
{
    
    constructor(){
        super({
            key: "Text",
        })
    }

    
    preload ()
    {
        this.load.image("mario-tiles", "/src/assets/cracktilemap.png");

    }


    create ()
    {
        console.log("text created")
        //add cracks
        // const level = [
        //     [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
        //     [  0,   1,   2,   3,   0,   0,   0,   1,   2,   3,   0 ],
        //     [  0,   5,   6,   7,   0,   0,   0,   5,   6,   7,   0 ],
        //     [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
        //     [  0,   0,   0,  14,  13,  14,   0,   0,   0,   0,   0 ],
        //     [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
        //     [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
        //     [  0,   0,  14,  14,  14,  14,  14,   0,   0,   0,  15 ],
        //     [  0,   0,   0,   0,   0,   0,   0,   0,   0,  15,  15 ],
        //     [ 35,  36,  37,   0,   0,   0,   0,   0,  15,  15,  15 ],
        //     [ 39,  39,  39,  39,  39,  39,  39,  39,  39,  39,  39 ]
        //   ];
        
        //   // When loading from an array, make sure to specify the tileWidth and tileHeight
        //   const map = this.make.tilemap({ data: level, tileWidth: 16, tileHeight: 16 });
        //   const tiles = map.addTilesetImage("mario-tiles");
        //   const layer = map.createLayer(0, tiles, 0, 0);

        const level = [
                    [  0,   3,   0,   0,   0,   0,   0,   0,   0,   0,   0 ]
                  ];
                
                  // When loading from an array, make sure to specify the tileWidth and tileHeight
                  const map = this.make.tilemap({ data: level, tileWidth: 80, tileHeight: 220 });
                  const tiles = map.addTilesetImage("mario-tiles");
                  const layer = map.createLayer(0, tiles, 0, 0);
                  this.cameras.main.setZoom(.5)
          
        //   const tiles = map.addTilesetImage("crack-tiles");
        //   const layer = map.createLayer(0, tiles, 0, 0);
        
        // //   // When loading from an array, make sure to specify the tileWidth and tileHeight
        //   this.add.image(960,540,"mario-tiles")
        // //   const map = this.add.tilemap({ data: level});
        // //   const tiles = map.addTilesetImage("crack", "crack-tiles", 80, 220);
        // //   map.createLayer(0, tiles, 0, 0)
        //   console.log(map.currentLayerIndex)
        //   console.log(map)
    }

    update() {

    }
}