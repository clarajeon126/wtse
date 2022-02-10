// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc, query, orderBy, limit, addDoc } from 'firebase/firestore/lite';
import baseboard from "../assets/passets/baseboard.png"
import Phaser from "phaser";

import background from "../assets/bgmain.png"

import buttonplain from "../assets/passets/button.png"

//font files
import fontpng from "../assets/minecraftia.png";
import fontxml from "../assets/minecraftia.xml";


export default class Leaderboard extends Phaser.Scene
{
    constructor ()
    {
        super({
            key: "Leaderboard"
        });
    }
    init(data) {
        console.log('init', data);
        this.addname = data.name;
        this.addscore = data.score
    }

    preload ()
    {
        this.load.image('baseboard', baseboard)
        this.load.spritesheet('button', buttonplain, { frameWidth: 30, frameHeight: 12 });
        this.load.spritesheet('background',background, {frameWidth: 192, frameHeight: 108} )

        
        //load font
        this.load.bitmapFont(
            'font',
            fontpng,
            fontxml
        );
    }
      
    create ()
    {
        //for bg anims
        this.background = this.add.sprite(96, 54, 'background').setAlpha(.5)
        this.anims.create({
            key: 'runbg',
            frames: this.anims.generateFrameNumbers('background', { frames: [0,1,2,3,4] }),
            frameRate: 1,
            repeat: -1
        });

        this.background.anims.play('runbg')

        // Your web app's Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyA6s2KLIjKtmL1SCmraGVQ_2tNqbBNs6kA",
            authDomain: "wtse-784ca.firebaseapp.com",
            projectId: "wtse-784ca",
            storageBucket: "wtse-784ca.appspot.com",
            messagingSenderId: "926418313509",
            appId: "1:926418313509:web:75be780bfa0395e6167acc"
        };
        
        // Initialize Firebase
        this.app = initializeApp(firebaseConfig);
        const database = getFirestore(this.app);

        // Get a list of cities from your database
        this.getLeaderBoard = async (db) => {
            const leaderboardCol = collection(db, 'leaderboard');
            const leaderboardQuery = query(leaderboardCol, orderBy("score"), limit(10))
            const leaderboardSS = await getDocs(leaderboardQuery)
            const leaderboardList = await leaderboardSS.docs.map(doc => doc.data());
            console.log(leaderboardList)
            return leaderboardList
            
            // leaderboardList.map((place, index) => {
            //     var str = `${(index + 1)} ${place.name} ${place.score}` + "\n" 
            // })
        }

        async function addLeaderboard(db, name, score){
            console.log(name + score)
            await setDoc(doc(db, "leaderboard", name), {
                name: name,
                score: score
              });
            return "yes"
        }

        if(this.addname && this.addscore){
            addLeaderboard(database, this.addname, this.addscore).then(() => {
                this.getLeaderBoard(database).then(leaderboardList => {
                    console.log("hi")
                    this.nameStr = ""
                        this.numStr = ""
                        this.scoreStr = ""
                    leaderboardList.forEach((place, index) => {
                        
                        this.nameStr += `${place.name}` + "\n"
                        this.numStr += `${index + 1}` + "\n" 
                        this.scoreStr += `${place.score}` + "\n"  
                    })
                })
            })
        }

        this.baseboard = this.add.image(96, 54, 'baseboard')

        this.nameStr = ""
        this.numStr = ""
        this.scoreStr = ""
        

        

        this.getLeaderBoard(database).then(leaderboardList => {
            
            leaderboardList.forEach((place, index) => {
                this.nameStr += `${place.name}` + "\n"
                this.numStr += `${index + 1}` + "\n" 
                this.scoreStr += `${place.score}` + "\n"  
            })
        })

        this.titleText = this.add.bitmapText(960, 220, 'font', "Leaderboard").setFontSize(35)
        this.numText = this.add.bitmapText(560, 540,'font',  this.numStr).setFontSize(40)
        this.nameText = this.add.bitmapText(960, 540, 'font', this.nameStr).setFontSize(40)
        this.scoreText = this.add.bitmapText(1360, 540, 'font', this.scoreStr).setFontSize(40)

        this.gameButton = this.physics.add.staticSprite(17, 8, 'button').setInteractive();
        this.gameText = this.add.bitmapText(170, 70, 'font', "back to wtse" ).setFontSize(30).setMaxWidth(400)

        //restart button anims
        this.anims.create({
            key: 'hoverg',
            frames: this.anims.generateFrameNumbers('button', { frames: [1] }),
            frameRate: 6,
            repeat: 0
        });

        this.anims.create({
            key: 'outg',
            frames: this.anims.generateFrameNumbers('button', { frames: [0] }),
            frameRate: 6,
            repeat: 0
        });

        this.anims.create({
            key: 'clickg',
            frames: this.anims.generateFrameNumbers('button', { frames: [2, 0] }),
            frameRate: 6,
            repeat: 0
        });

        //for restart
        //when hover 
        this.gameButton.on('pointerover', function () {
            this.anims.play('hoverg', true)
        });

        //when not hovering
        this.gameButton.on('pointerout', function () {
            this.anims.play('outg', true)
        });

        //when clicking
        this.gameButton.on('pointerdown', () => {
            this.gameButton.anims.play('clickg', true)

            //reload parallax scene
            this.time.addEvent({
                delay: 400,
                callback: () => {
                    //load leaderboard
                    this.scene.start("Parallax")
                }
            })
        });
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
        this.numText.setText(this.numStr)
        this.nameText.setText(this.nameStr)
        this.scoreText.setText(this.scoreStr)
    }
}