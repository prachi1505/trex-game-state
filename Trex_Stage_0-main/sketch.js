var trex , trex_running;
var edges;
var ground, ground_image;
var invisible_ground;
var desert,desert_image;
var cloud,cloud_image;
var score=0
var cactus,cactus_image1,cactus_image2,
cactus_image3,cactus_image4,
cactus_image5,cactus_image6;
var cactus_group
var cloud_group
var PLAY=1
var END=0
var gamestate=PLAY
function preload(){
  trex_running= loadAnimation("images/trex1.png" ,
                        "images/trex3.png", "images/trex4.png" );
  ground_image = loadImage( "images/ground2.png");
  desert_image = loadImage( "images/desert.png");
  cloud_image=loadImage("images/cloud.png");
  cactus_image1=loadImage("images/obstacle1.png");
  cactus_image2=loadImage("images/obstacle2.png");
  cactus_image3=loadImage("images/obstacle3.png");
  cactus_image4=loadImage("images/obstacle4.png");
  cactus_image5=loadImage("images/obstacle5.png");
  cactus_image6=loadImage("images/obstacle6.png");
}

function setup(){
  createCanvas(600,200)

 // desert=createSprite(330,0,800,200);
  //desert.addImage("desert" ,  desert_image) ;
  //  desert.scale=1;
  //create trex
  trex= createSprite(50,160,10,100);
  trex.addAnimation ("running" ,  trex_running) ;
  trex.scale=0.5;

  //create edges
  edges = createEdgeSprites();

  // creat ground
  ground=createSprite(300,170,700,20);
  ground.addImage("ground" ,  ground_image) ;
  
//creating groups
  cactus_group=new Group();

  cloud_group=new Group();


  //creat invisible ground
  invisible_ground=createSprite(300,190,700,20);
  invisible_ground.visible=false;

}

function draw(){
  background("skyBlue"); 
  text ("score:"+score,500,50)
if(gamestate===PLAY){
  
  score=score+Math.round(frameCount/60)
  console.log(trex.y);
 
  //move trex up
 if (keyDown("space")&&trex.y>=100){
  trex.velocityY=-10;

}

//gravity for trex
trex.velocityY=trex.velocityY+0.8;
 //making ground move
 ground.velocityX=-2;

 //make ground come continuasly
 if(ground.x<0){
   ground.x= ground.width/2;

 }
  clouds();
  Cactus();
if(cactus_group.isTouching(trex)){
  gamestate=END
}
}
else if(gamestate===END){
ground.velocityX=0
cactus_group.setVelocityXEach(0)
cloud_group.setVelocityXEach(0)



}



 
 
 

  // collide trex with ground
  trex.collide(invisible_ground);
  
  drawSprites();

}
function clouds() {
  if(frameCount%60===0){
 cloud=createSprite(600,40,100,10);
 cloud.addImage("clouds",cloud_image);
 cloud.scale=0.8;
 cloud.velocityX=-3;
 cloud.y=Math.round(random(10,60));
 trex.depth=cloud.depth;
 trex.depht=trex.depth+1
 cloud.lifetime=200
  cloud_group.add(cloud)

  }
}
function Cactus(){
  if(frameCount%100===0){ 
cactus=createSprite(600,165,10,40)
cactus.velocityX=-3
var R=Math.round(random(1,6));
switch(R){
  case 1:
  cactus.addImage(cactus_image1);
  break;
  case 2:
    cactus.addImage(cactus_image2);
    break;
    case 3:
      cactus.addImage(cactus_image3);
      break;
      case 4:
       cactus.addImage(cactus_image4);
        break;
        case 5:
  cactus.addImage(cactus_image5);
  break;
  case 6:
  cactus.addImage(cactus_image6);
  break;
  default:break;
}
cactus.scale=0.5;
cactus.lifetime=200
cactus_group.add(cactus);
}
}
