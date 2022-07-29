var towerImg, tower;
var doorImg;
var doorsGroup;
var climber, climberImg, climberGroup;
var invisibleBlock, invisibleGroup;
var gameState="play";
var ghostImg, ghost;

function preload(){
  doorImg = loadImage("door.png")
  towerImg = loadImage("tower.png");
  climberImg= loadImage("climber.png")
  ghostImg= loadImage("ghost-jumping.png")
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup= new Group();
  invisibleGroup= new Group();
  ghost=createSprite(300, 300);
  ghost.addImage("ghost",ghostImg);
  ghost.scale= 0.3;
  climberGroup= new Group();
}


function draw() {
  background(200);
  
 
    
  if(gameState=="play"){
if(keyDown("left_arrow")){
  ghost.x= ghost.x-2;
}
if(keyDown("right_arrow")){
  ghost.x= ghost.x+2;
}
if(keyDown("space")){
  ghost.velocityY=  -10;
}

ghost.velocityY= ghost.velocityY+0.4  ;

if(tower.y > 400){
  tower.y = 300
}
spawnDoors();

if(climberGroup.isTouching(ghost)){
ghost.velocityY=0;
}
if(invisibleGroup.isTouching(ghost)||ghost.y>600){
ghost.destroy();
gameState= "end"

}

drawSprites();
  }

if(gameState=="end"){
textSize(35)
text("GAME OVER",230, 250);


}
    
    
}


function spawnDoors() {
  // Escribe código aquí para crear puertas en la torre.
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    climber= createSprite(200, 10);
    invisibleBlock= createSprite(200, 15);
    invisibleBlock.width= climber.width;
    invisibleBlock.height=2;

    
    
    door.x = Math.round(random(120,400));
    invisibleBlock.x= door.x;
    climber.x= door.x;

    climber.addImage(climberImg);
    door.addImage(doorImg);
   
    door.velocityY = 3;
    climber.velocityY= door.velocityY;
    invisibleBlock.velocityY= door.velocityY;

    // Asigna tiempo de vida a la variable.
    door.lifetime = 800;
    climber.lifetime= 800;
    invisibleBlock.lifetime= 800;

    ghost.depth= door.depth;
    ghost.depht+=1
    
    // Agrega cada puerta al grupo.
    doorsGroup.add(door);
    climberGroup.add(climber);
    invisibleGroup.add(invisibleBlock);
  }
}

