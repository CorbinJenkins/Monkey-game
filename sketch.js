
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0
var ground
var PLAY=0
var END=1
var gameState=PLAY
var time=0


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400)
  monkey=createSprite(50,200,10,10)
  monkey.addAnimation("run monkey",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,800,5);
  
  FoodGroup=createGroup();
  obstacleGroup=createGroup();
}


function draw() {
  background(255);
  
  if (gameState===PLAY){
    
      monkey.collide(ground);
  monkey.velocityY+=2
  Rock();
  Banana();
  
  console.log(monkey.y)
    
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score+=2;
    
  }
  
  if(keyDown("space")&&monkey.y>=316.7){
   monkey.velocityY=-25;
 }
    
    if(obstacleGroup.isTouching(monkey)){
      gameState=END
      
    }
    stroke("yellow");
    textSize(20);
    fill("black");
    text("score: "+score,100,100);
    
    stroke("black");
    textSize(20);
    fill("black");
    time=Math.ceil(frameCount/frameRate())
    text("Survival Time: "+ time,100,50)
    
  }
  if(gameState===END){
    monkey.velocityY=0;
    obstacleGroup.setVelocityXEach=0;
    FoodGroup.setVelocityXEach=0;
    FoodGroup.setLifetimeEach(0);
    obstacleGroup.setLifetimeEach(0);
    text("Game Over",200,200)
  }
  
  
  
  drawSprites();
 
}

function Banana(){
  
  if(frameCount%80===0){
     var banana=createSprite(400,10,10,10)
     banana.addImage("banana",bananaImage)
     banana.y=Math.round(random(120,200));
     banana.velocityX=-8
     banana.lifetime=100
     banana.scale=0.1
     FoodGroup.add(banana);
  }
}
function Rock(){
  if (frameCount%100===0){
    var rock=createSprite(400,315,10,100);
    rock.addImage("rock",obstacleImage);
    rock.lifetime=100;
    rock.velocityX=-12;
    rock.scale=0.2
    obstacleGroup.add(rock);
    
  }
  
  
}




