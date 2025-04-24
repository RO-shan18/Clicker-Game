class UI {
  constructor(scene) {
    this.scene = scene;
    this.shopitems = [];
    this.shopproducts = [];
    this.fruit = [];
    this.fruitStatus = [];
    this.items = [];
    this.sidebar;
    this.prices = []
    this.priceTag = []
  }

  preload() {
    //coin
    this.scene.load.image("coin", "Assets/Others/coin.png");

    //fruits Fruits_jpg
    this.scene.load.image("apple", "Assets/Fruits_jpg/apple.jpeg");
    this.scene.load.image("burger", "Assets/Fruits_jpg/burger.png");
    this.scene.load.image("orange", "Assets/Fruits_jpg/orange.jpeg");
    this.scene.load.image("pear", "Assets/Fruits_jpg/pear.png");
    this.scene.load.image("strawberry", "Assets/Fruits_jpg/strawberry.png");
    this.scene.load.image("grapes", "Assets/Fruits_jpg/grapes.jpeg");
    this.scene.load.image("pineapple", "Assets/Fruits_jpg/pineapple.png");

    //fruits png image
    this.scene.load.image("apple2", "Assets/Fruits_png/apple.png");
    this.scene.load.image("burger2", "Assets/Fruits_png/burger.png");
    this.scene.load.image("orange2", "Assets/Fruits_png/orange.png");
    this.scene.load.image("pear2", "Assets/Fruits_png/pear.png");
    this.scene.load.image("strawberry2", "Assets/Fruits_png/strawberry.png");
    this.scene.load.image("grapes2", "Assets/Fruits_png/grapes.png");
    this.scene.load.image("pineapple2", "Assets/Fruits_png/pineapple.png");
  }

  create() {
    this.createUI();
    this.shopitem();
    this.setupCharacters();
    console.log('script loaded');
  }

  createUI() {
    // Black transparent background on left side
    this.sidebar = this.scene.add.graphics();
    this.sidebar.fillStyle(0x000000, 0.6); // black with 60% opacity
    this.sidebar.fillRect(0, 0, 225, this.scene.scale.height);
  }

  setupCharacters() {
    this.characters = [];
    this.prices = [10000,20000,30000,40000];

    for (let i = 2; i <= 5; i++) {
        

        // Character images
        const characterImage = this.scene.add.image(100, 150 * (i-1), `funny${i}`); 
        characterImage.setInteractive(); 
        characterImage.setDepth(2)

        const bg = this.scene.add.graphics();
        bg.fillStyle(0x000000, 0.8); // Darker black for individual bg
        bg.fillRect(characterImage.x-70, characterImage.y-65, 150, 135);

        if(i!==3){
          characterImage.setScale(0.6)
        }
       
        const lockImage = this.scene.add.image(characterImage.x, characterImage.y-20, 'lock');
        lockImage.setVisible(true);
        

        const coin = this.scene.add.image(characterImage.x+30, characterImage.y+25, 'coin').setScale(0.2)
        coin.setVisible(false)
        
        const priceText = this.scene.add.text(
          characterImage.x-10 , 
          characterImage.y + 25, 
          this.prices[i-2].toLocaleString(), 
          {
            fontSize: '16px',
            fill: '#ffffff',
            fontFamily: 'Arial',
          }
        );
        priceText.setOrigin(0.5, 0.5);

        characterImage.on('pointerover', () => {
            this.scene.input.setDefaultCursor('pointer');
        });

        characterImage.on('pointerout', () => {  
            this.scene.input.setDefaultCursor('default');
           
        });

        characterImage.on('pointerdown', ()=>{   
            if(this.scene.score >= this.prices[i-2]){
            this.scene.character.setTexture(characterImage.texture.key)
            characterImage.setAlpha(1)

            this.scene.score -= this.prices[i-2];
            this.scene.scoreText.setText(this.scene.formatScore(this.scene.score));

            lockImage.setVisible(false);
            lockImage.setDepth(1);
            
            coin.setVisible(false);
            coin.setDepth(1);

            priceText.setDepth(1);
            }
        })

        this.characters.push({
              image: characterImage,
              lock: lockImage,
              bg: bg,
              priceText: priceText, 
              coin : coin,
          });
    }
    this.updateCharacterLocks();
  }

  updateCharacterLocks() {
    this.characters.forEach((char, index) => {
        const characterPrice = this.prices[index];
        if (this.scene.score < characterPrice) {
            char.image.setAlpha(0.5);
            char.lock.setVisible(true);
            char.lock.setDepth(3);
            char.priceText.setDepth(3);
            char.coin.setVisible(true);
            char.coin.setDepth(3)
        } else {
            char.image.setAlpha(1);
            char.lock.setVisible(false);
            char.lock.setDepth(1);
            char.priceText.setDepth(1);
            char.coin.setVisible(false);
            char.coin.setDepth(1)
        }
    });
}

  update() {}

  shopitem() {
    //item 1
    this.items = ['apple','burger','orange','pear','strawberry','grapes','pineapple']
    let startX, startY, moveX, moveY;
    for(let i=0; i<7; i++){
    if (i == 0) {
      startX = 700; startY = 540;
      moveX = startX - 300;
      moveY = startY - 250;
    } else if (i == 1) {
      startX = 695; startY = 515;
      moveX = startX - 200;
      moveY = startY - 150;
    } else if (i == 2) {
      startX = 705; startY = 490;
      moveX = startX - 100;
      moveY = startY - 80;
    } else if (i == 3) {
      startX = 740; startY = 470;
      moveX = startX;
      moveY = startY - 30;
    } else if (i == 4) {
      startX = 775; startY = 490;
      moveX = startX + 100;
      moveY = startY - 80;
    } else if (i == 5) {
      startX = 785; startY = 515;
      moveX = startX + 200;
      moveY = startY - 150;
    } else if (i == 6) {
      startX = 780; startY = 540;
      moveX = startX + 300;
      moveY = startY - 250;
    }
    this.fruit.push(this.scene.add.image(moveX, moveY, this.items[i]));

    this.fruitStatus[i] = i === 0 ? 'unlocked' : 'locked'; 

    // Make it rounded
    let maskShape = this.scene.make.graphics();
    maskShape.fillStyle(0xffffff);
    maskShape.fillCircle(0, 0, this.fruit[i].displayWidth / 2);
  
    let mask = maskShape.createGeometryMask();
    this.fruit[i].setMask(mask);
    maskShape.setPosition(this.fruit[i].x, this.fruit[i].y);

    this.fruit[i].setInteractive();
    if(i!==0){
    this.fruit[i].setAlpha(0.5);

    let priceText = this.scene.add.text(
      this.fruit[i].x, 
      this.fruit[i].y,
      `${this.getFruitPrice(i)} coins`,
      { fontSize: '15px', color: '#ffffff', backgroundColor: '#000000' }
    ).setOrigin(0.5);

    this.priceTag[i] = priceText;
  }

    ((index, x, y) => {
      this.fruit[index].on('pointerdown', () => this.onFruitClick(index, x, y));
      this.fruit[index].on('pointerover', () => this.onFruitHover(index));
      this.fruit[index].on('pointerout', () => this.onFruitOut(index));
    })(i, moveX, moveY);
  }

  }

  onFruitClick(i, moveX, moveY) {
    if (this.fruitStatus[i] === 'unlocked') {
      let fruit = this.items[i] + '2';
      let throwfruit = this.scene.add.image(moveX, moveY, fruit)
      throwfruit.setScale(0.5)
      // Fruit animation toward mouth
      this.scene.tweens.add({
        targets: throwfruit,
        x: this.scene.character.x + 15, 
        y: this.scene.character.y + 13,
        alpha: 0.5,
        duration: 900,
        ease: 'Power2',
        onComplete: () => {
          throwfruit.destroy();
          this.increasePoints(i);
          this.scene.showpointscore(this.scene.character.x, this.scene.character.y, i+1)
        }
      });
    } else {
      this.tryUnlockFruit(i);
    }
  }

  onFruitHover(i) {
    if (this.fruitStatus[i] === 'locked'){
      this.scene.input.setDefaultCursor('pointer');
    }
    
  }

  onFruitOut(i) {
    if (this.fruitStatus[i] === 'locked') {
      this.scene.input.setDefaultCursor('Default');
    }
  }

  increasePoints(i) {
    let price = this.getFruitPrice(i);
    this.scene.score += (price/100);  
    this.scene.scoreText.setText(this.scene.formatScore(this.scene.score));
  }

  tryUnlockFruit(i) {
    let price = this.getFruitPrice(i);
    if (this.scene.score >= price) {
      this.scene.score -= price;
      this.scene.scoreText.setText(this.scene.formatScore(this.scene.score));
      this.fruitStatus[i] = 'unlocked';
      this.fruit[i].setAlpha(1); // Make fruit fully visible after unlock
      if (this.priceTag[i]) {
        this.priceTag[i].destroy(); // <-- Destroy only that fruit's price tag
      }

    } else {
      // Optional: show "Not enough coins" text
    }
  }

  getFruitPrice(i) {
    return 100 * (i + 1); // Example: apple 200, burger 400, etc.
  }
}

export { UI };
