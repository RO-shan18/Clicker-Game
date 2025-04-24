import {UI} from "./UI.js";

class GameScene extends Phaser.Scene{   
    constructor(){
        super('GameScene');
        this.UI = null;
        this.score = 0;
        this.scoreText;
    }

    preload(){

        //character 
        this.load.image('funny1', 'Assets/Character/funny.png');
        this.load.image('funny2', 'Assets/Character/funny_2.png');
        this.load.image('funny3', 'Assets/Character/funny_3.png');
        this.load.image('funny4', 'Assets/Character/funny_4.png');
        this.load.image('funny5', 'Assets/Character/funny_5.png');

        //lock image
        this.load.image('lock', 'Assets/Others/lock.png');

        //load coin
        this.load.image('coin', 'Assets/Others/coin.png');

        //score
        this.load.image('1score', 'Assets/Others/text_1_small.png');
        this.load.image('2score', 'Assets/Others/text_2_small.png');
        this.load.image('3score', 'Assets/Others/text_3_small.png');
        this.load.image('4score', 'Assets/Others/text_4_small.png');
        this.load.image('5score', 'Assets/Others/text_5_small.png');
        this.load.image('6score', 'Assets/Others/text_6_small.png');
        this.load.image('7score', 'Assets/Others/text_7_small.png');

        //plus 
        this.load.image('plus', 'Assets/Others/text_plus_small.png')

        this.UI = new UI(this);
        this.UI.preload();
    }

    create(){    
        // //add character image
        this.character = this.physics.add.image(740, 231.5, 'funny1');
        this.character.setImmovable(true); 
        this.character.body.allowGravity = false;
        this.character.setInteractive();
        this.character.setScale(1.5);
        console.log('script loaded');

        this.UI.create(this);

        //add coin image
        let coin = this.physics.add.staticImage(1300, 30, 'coin');
        coin.setScale(0.3)

        //add score system
        this.scoreText = this.add.text(coin.x+50, coin.y - 12, this.score, {
            fontFamily: "cursive",
            fontSize: "22px",
            color: "#000000",
            align: "center",
        })

    }

    update(){
        this.UI.update();
    }

    showpointscore(xpos, ypos, index){
        let point = this.physics.add.staticImage(xpos, ypos-100, `${index}score`);
        let plus = this.physics.add.staticImage(xpos-25, ypos-100,'plus');
        plus.setScale(0.9);

        this.tweens.add({
            targets: point,
            x: point.x,
            y: point.y - 70,
            duration: 300,
            onComplete: ()=>{
                point.destroy();
            }
        })

        this.tweens.add({
            targets: plus,
            x: plus.x,
            y: plus.y - 70,
            duration: 300,
            onComplete: ()=>{
                plus.destroy();
            }
        })
    }

    formatScore(score) {
        if (score >= 1000000) {
            return (score / 1000000).toFixed(1) + 'M';
        } else if (score >= 1000) {
            return (score / 1000).toFixed(1) + 'K';
        } else {
            return score.toString();
        }
    }
}

export { GameScene };