let oneXPos = 75;
let oneYPos = 100;
let oneLeft, oneRight, oneTop, oneBottom;

let twoXPos = 625;
let twoYPos = 100;
let twoLeft, twoRight, twoTop, twoBottom;

let spikeXPos = 350;
let spikeYPos = 350;
let spikeDirection = 1;
let spikeLeft, spikeRight, spikeTop, spikeBottom
let spikeSpeed=5

let coinXPos = 250;
let coinYPos = 250;
let coinLeft, coinRight, coinTop, coinBottom;

let coin2XPos = 450;
let coin2YPos = 250;
let coin2Left, coin2Right, coin2Top, coin2Bottom;

let coinWidth=38.8
let coinHeight=51.2

let diamondXPos = 350;
let diamondYPos = 250;
let diamondLeft, diamondRight, diamondTop, diamondBottom;

let diamondWidth=19.1
let diamondHeight=20.8

let score1 = 0;
let score2 = 0;

let state = "title";

let winner;

let ballArray = [];

let spikeImg
let playerOneImg
let playerTwoImg
let coinImg
let diamondImg
let skyImg
let spaceImg
let waterImg

let coinSound
let spikeSound
let diamondSound
let menuSound
let skySound
let spaceSound
let waterSound

let congratsSound

let backgrounds=[]
let bg

// Delay function
function sleep(milliseconds) { 
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

// Images used
function preload(){
  spikeImg=loadImage('images/spikeImg.png')
  coinImg=loadImage('images/coinImg.png')
  diamondImg=loadImage('images/diamondImg.png')
  skyImg=loadImage('images/skyImg.webp')
  spaceImg=loadImage('images/spaceImg.jpeg')
  waterImg=loadImage('images/waterImg.jpeg')
}

function setup() {
  createCanvas(700, 700);
  background(0);
  noStroke();
  rectMode(CENTER);
  imageMode(CENTER)
  textFont("Georgia")
  
//   Sound used
  coinSound=loadSound('sounds/.coinmp3')
  spikeSound=loadSound('sounds/spike.wav')
  diamondSound=loadSound('sounds/diamond.mp3')
  menuSound=loadSound('sounds/menu.mp3')
  skySound=loadSound('sounds/sky.mp3')
  spaceSound=loadSound('sounds/space.mp3')
  waterSound=loadSound('sounds/water.mp3')
  congratsSound=loadSound('sounds/congrats.wav')
  
//   A random backgroud from a list of 3 is selected before each game.
  backgrounds.push(skyImg,spaceImg,waterImg)
  bg=backgrounds[Math.floor(random(0,3))]
  
//  Balloon objects created for use in the end screens. 
  for (let i = 0; i < 100; i++) {
    let temp = new Ball(
      random(0, 700),
      random(0,700),
      random(0, 255),
      random(0, 255),
      random(0, 255),
      random(5, 8),
      random(25, 50)
    );
    ballArray.push(temp);
  }
}

function draw() {
  
//   Beginning state of the game: Title Screen
  if(state=="title"){
    textSize(100)
    fill(255)
    text("p5.js Game",100,250)
    fill(0,255,0)
    rect(350,450,200,100)
    fill(0)
    textSize(50)
    text("PLAY",290,465)
  }
//   Mode selections (1 Player or 2 Player modes)
  else if(state=="menu"){
    if(!menuSound.isPlaying()){
    menuSound.play()
    }
    background(0)
//     Text blurbs that describe each mode when the mouse hovers over the options
    if(mouseX>250 && mouseX<450 && mouseY>200 && mouseY<300){
      fill(255)
      textSize(25)
      text("Collect coins and diamonds to reach a score of 25!",80,650)
      text("If you touch the spikes, you lose!",175,675)
       }
    else if(mouseX>250 && mouseX<450 && mouseY>350 && mouseY<450){
      fill(255)
      textSize(25)
      text("Compete for coins and diamonds to reach a score of 25!",45,650)
      text("If you touch the spikes, your score gets reset!",100,675)
       }
    else{
      background(0)
    }
    fill(255)
    textSize(80)
    text("SELECT MODE",70,100)
    fill(255,0,0)
    rect(350,250,200,100)
    fill(0)
    textSize(50)
    text("1P Mode",255,265)
    fill(0,255,0)
    rect(350,400,200,100)
    fill(0)
    text("2P Mode",252.5,415)
  }
//   Main Game States (1P or 2P)
  else if (state == "1P"|| state=="2P") {
    menuSound.stop()
    image(bg,350,350,700,700);
//     The random background and corresponding music are selected and used
    if(bg==backgrounds[0]){
      if(!skySound.isPlaying()){
        skySound.play()
      }
    }
    if(bg==backgrounds[1]){
      if(!spaceSound.isPlaying()){
        spaceSound.play()
      }
    }
    if(bg==backgrounds[2]){
      if(!waterSound.isPlaying()){
        waterSound.play()
      }
    }
    //Player 1
    fill(255, 0, 0);
    rect(oneXPos, oneYPos, 50, 50);
    fill(0)
    rect(oneXPos-12.5,oneYPos-12.5,5,5)
    rect(oneXPos+12.5,oneYPos-12.5,5,5)
    rect(oneXPos,oneYPos+12.5,35,5)

    //Movement for Player 1 (WASD)
    
//     A key
    if(oneXPos>25){
      if (keyIsDown(65)) {
      oneXPos -= 3;
      }
    }
//     D Key
    if(oneXPos<675){
      if (keyIsDown(68)) {
      oneXPos += 3;
      }
    }
//     W Key
    if(oneYPos>25){
      if (keyIsDown(87)) {
      oneYPos -= 3;
      }
    }
//     S Key
    if(oneYPos<675){
      if (keyIsDown(83)) {
      oneYPos += 3;
      }
    }

    //Hitbox for Player 1
    oneLeft = oneXPos - 25;
    oneRight = oneXPos + 25;
    oneTop = oneYPos - 25;
    oneBottom = oneYPos + 25;

//     Player 2 is only functionable in the 2P Mode
    if(state=="2P"){
      //Player 2
    fill(0, 0, 255);
    rect(twoXPos, twoYPos, 50, 50);
    fill(0)
    rect(twoXPos-12.5,twoYPos-12.5,5,5)
    rect(twoXPos+12.5,twoYPos-12.5,5,5)
    rect(twoXPos,twoYPos+12.5,35,5)

    //Movement for Player 2 (Arrow keys)
    if(twoXPos>25){
      if (keyIsDown(LEFT_ARROW)) {
      twoXPos -= 3;
      }
    }
    
    if(twoXPos<675){
      if (keyIsDown(RIGHT_ARROW)) {
      twoXPos += 3;
      }
    }
    
    if(twoYPos>25){
      if (keyIsDown(UP_ARROW)) {
      twoYPos -= 3;
      }
    }
    
    if(twoYPos<675){
      if (keyIsDown(DOWN_ARROW)) {
      twoYPos += 3;
      }
    }
  
    //Hitbox for Player 2
    twoLeft = twoXPos - 25;
    twoRight = twoXPos + 25;
    twoTop = twoYPos - 25;
    twoBottom = twoYPos + 25;
    }
    else{
//       If the mode is single player, the 2P score is set to -1 (to be used later)
      score2=-1
    }

    // Spikes (Resets your score or ends your game)
    image(spikeImg,spikeXPos,spikeYPos,100,50)
    spikeXPos += spikeDirection * spikeSpeed;
    
//     Spikes rebound when they hit the horizontal boundaries
    if (spikeXPos >= 650 || spikeXPos <= 50) {
      spikeDirection *= -1;
      if(state=="1P"){
//         Only in the 1P mode, the spike speed increases for every rebound (up to a speed of 20)
        if(spikeSpeed<=20){
          spikeSpeed++
        }
      }
    }

    // Spikes Hitbox
    spikeLeft = spikeXPos - 50;
    spikeRight = spikeXPos + 50;
    spikeTop = spikeYPos - 25;
    spikeBottom = spikeYPos + 25;

    //If Player 1 touches the Spikes, their score is reset to 0 (2P mode), or the game ends (1P mode).
    if (
      oneLeft > spikeRight ||
      oneRight < spikeLeft ||
      oneTop > spikeBottom ||
      oneBottom < spikeTop
    ) {
      //No collision
    } else {
      if(!spikeSound.isPlaying()){
        spikeSound.play()
      }
      if(state=="2P"){
        score1 = 0;
      }
      else{
        state="over"
      }
    }

    //If Player 2 touches the Spikes, their score is reset to 0.
    if(state=="2P"){
      if (
      twoLeft > spikeRight ||
      twoRight < spikeLeft ||
      twoTop > spikeBottom ||
      twoBottom < spikeTop
    ) {
      //No collision
    } else {
      if(!spikeSound.isPlaying()){
        spikeSound.play()
      }
      score2 = 0;
    }
    }

    //Coin (1 point)
    fill(255, 255, 0);
    image(coinImg,coinXPos,coinYPos,coinWidth,coinHeight)

    //Hitbox for Point1
    coinLeft = coinXPos - coinWidth/2;
    coinRight = coinXPos + coinWidth/2;
    coinTop = coinYPos - coinHeight/2;
    coinBottom = coinYPos + coinHeight/2;

    //If Player 1 touches the Coin, they get 1 Point
    if (
      oneLeft > coinRight ||
      oneRight < coinLeft ||
      oneTop > coinBottom ||
      oneBottom < coinTop
    ) {
      //No collision
    } else {
      coinSound.play()
      score1++;
      coinXPos = random(25, 475);
      coinYPos = random(25, 475);
    }

    if(state=="2P"){
      //If Player 2 touches the Coin, they get 1 Point
    if (
      twoLeft > coinRight ||
      twoRight < coinLeft ||
      twoTop > coinBottom ||
      twoBottom < coinTop
    ) {
      //No collision
    } else {
      coinSound.play()
      score2++;
      coinXPos = random(25, 475);
      coinYPos = random(25, 475);
    }
    }
    
//     The second coin only appears if on the 2P mode.
    if(state=="2P"){
      //Coin 2
    fill(255, 255, 0);
    image(coinImg,coin2XPos, coin2YPos, coinWidth, coinHeight);

    //Hitbox for Coin 2
    coin2Left = coin2XPos - coinWidth/2;
    coin2Right = coin2XPos + coinWidth/2;
    coin2Top = coin2YPos - coinHeight/2;
    coin2Bottom = coin2YPos + coinHeight/2;

    //If Player 1 touches the Coin, they get 1 point
    if (
      oneLeft > coin2Right ||
      oneRight < coin2Left ||
      oneTop > coin2Bottom ||
      oneBottom < coin2Top
    ) {
      //No collision
    } else {
      coinSound.play()
      score1++;
      coin2XPos = random(25, 475);
      coin2YPos = random(25, 475);
    }

      //If Player 2 touches the Coin, they get 1 point
    if (
      twoLeft > coin2Right ||
      twoRight < coin2Left ||
      twoTop > coin2Bottom ||
      twoBottom < coin2Top
    ) {
      //No collision
    } else {
      coinSound.play()
      score2++;
      coin2XPos = random(25, 475);
      coin2YPos = random(25, 475);
    }
    }

    //Diamond (3 Points)
    fill(255, 0, 255);
    image(diamondImg,diamondXPos,diamondYPos,diamondWidth,diamondHeight)

    //Hitbox for Diamond
    diamondLeft = diamondXPos - 12.5;
    diamondRight = diamondXPos + 12.5;
    diamondTop = diamondYPos - 12.5;
    diamondBottom = diamondYPos + 12.5;

    //If Player 1 touches the Diamond, they get 3 points
    if (
      oneLeft > diamondRight ||
      oneRight < diamondLeft ||
      oneTop > diamondBottom ||
      oneBottom < diamondTop
    ) {
      //No collision
    } else {
      diamondSound.play()
      score1 += 3;
      diamondXPos = random(25, 475);
      diamondYPos = random(25, 475);
    }

    if(state=="2P"){
      //If Player 2 touches the Diamond, they get 3 points
    if (
      twoLeft > diamondRight ||
      twoRight < diamondLeft ||
      twoTop > diamondBottom ||
      twoBottom < diamondTop
    ) {
      //No collision
    } else {
      diamondSound.play()
      score2 += 3;
      diamondXPos = random(25, 475);
      diamondYPos = random(25, 475);
    }
    }
    
    //Scoreboard for Player 1
    fill(255);
    textSize(15);
    text("Player One Score: " + score1, 10, 20);

//     P2 Scoreboard only appears in the 2P mode
    if(state=="2P"){
      //Scoreboard for Player 2
    fill(255);
    textSize(15);
    text("Player Two Score: " + score2, 555, 20);
    }

//   Whichever player reaches a score of 25 wins and the game ends.
//   If on the 1P mode and the player touches the spikes, they lose.    
    if (score1 >= 25) {
      winner = "Player One";
      state = "over";
      congratsSound.play()
    } 
    else if (score2 >= 25) {
      winner = "Player Two";
      state = "over";
      congratsSound.play()
    }
    else if(state=="over"){
      winner="none"
    }
  } 
//   Game Over Screen for 1P Mode (Lose)
  else if (state == "over") {
    background(0);
    skySound.stop()
    spaceSound.stop()
    waterSound.stop()
    if(winner=="none"){
      fill(255);
      textSize(55);
      text("GAME OVER ", 190, 100);
      textSize(40);
      text("You failed with a score of "+score1, 110, 350);
      fill(0,255,0)
      rect(350,600,200,100)
      fill(0)
      text("REPLAY",275,610)
    }
    else{
//       Balloon objects fall when a player wins
      for (let i = 0; i < ballArray.length; i++) {
      fill(
        ballArray[i].redValue,
        ballArray[i].greenValue,
        ballArray[i].blueValue
      );
      ellipse(
        ballArray[i].xPos,
        ballArray[i].yPos,
        ballArray[i].diameter,
        ballArray[i].diameter
      );

      ballArray[i].yPos += ballArray[i].speedValue;

      if (ballArray[i].yPos > 725) {
        ballArray[i].yPos = -25;
      }
    }
    fill(255);
    textSize(55);
    text("GAME OVER ", 190, 100);
    textSize(40);
//       By checking if the P2 Score is -1 (1P Mode), the program can tell whether a player won on the 2P mode or the 1P mode
    if(score2!=-1){
      text(winner + " is the WINNER", 110, 350);
    }
    else{
      text("CONGRATULATIONS, you won!", 55, 350);
    }
    fill(0,255,0)
    rect(350,600,200,100)
    fill(0)
    text("REPLAY",275,610)
    }
    
  }
}

// Balloon object class is defined
class Ball {
  constructor(x, y, r, g, b, speed, d) {
    this.xPos = x;
    this.yPos = y;
    this.redValue = r;
    this.greenValue = g;
    this.blueValue = b;
    this.speedValue = speed;
    this.diameter = d;
  }
}

function mouseClicked(){ 
  // The delays from the sleep functions are intended so that all sounds and images can load before gameplay.
  
//   Changes the game state to the menu if the PLAY button is clicked
  if(state=="title"){
    if(mouseX>250 && mouseX<450 && mouseY>400 && mouseY<500){
      coinSound.play()
      sleep(1000)
      state="menu"
       }
  } 
//   Changes the game state to either 1P or 2P if their corresponding button is clicked
  else if(state=="menu"){
    if(mouseX>250 && mouseX<450 && mouseY>200 && mouseY<300){
      coinSound.play()
      sleep(1000)
      state="1P"
       }
    else if(mouseX>250 && mouseX<450 && mouseY>350 && mouseY<450){ 
      coinSound.play()
      sleep(1000)
      state="2P"
       }
  }
//   Resets the game variables and sends the player back to the menu when the REPLAY button is clicked
  else if(state=="over"){
    if(mouseX>250 && mouseX<450 && mouseY>550 && mouseY<650){
       oneXPos = 75;
       oneYPos = 100;

       twoXPos = 625;
       twoYPos = 100;

       spikeXPos = 350;
       spikeYPos = 350;
       spikeDirection = 1;
       spikeSpeed=5

       coinXPos = 250;
       coinYPos = 250;

       coin2XPos = 450;
       coin2YPos = 250;

       diamondXPos = 350;
       diamondYPos = 250;

       score1 = 0;
       score2 = 0;
      
      bg=backgrounds[Math.floor(random(0,3))]
      
      state="menu"
       }
  }
}