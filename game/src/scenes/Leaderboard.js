// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc, query, orderBy, limit  } from 'firebase/firestore/lite';
import baseboard from "../assets/passets/baseboard.png"
import Phaser from "phaser";

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

    preload ()
    {
        this.load.image('baseboard', baseboard)

        //load font
        this.load.bitmapFont(
            'font',
            fontpng,
            fontxml
        );
    }
      
    create ()
    {
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

        this.baseboard = this.add.image(96, 54, 'baseboard')

        this.nameStr = ""
        this.numStr = ""
        this.scoreStr = ""
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
            await setDoc(doc(db, "leaderboard", name), {
                name: name,
                score: score
              });
            return "yes"
        }

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