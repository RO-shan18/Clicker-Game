import { GameScene } from "./GameScene.js";

const config = {
    type : Phaser.AUTO,
    width: 1520,
    height: 683.5,
    backgroundColor: '#483D8B',
    physics: {
        default : 'arcade',
        arcade : {
            gravity : { y : 20 }
        },
        
    },
    scene :[GameScene],
    debug:true,
}

const game = new Phaser.Game(config);