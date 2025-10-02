const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine,world;
var ground,box,platform;
var Mouse, attachment;
var boxCategory = 0x0001;
var circleCategory = 0x0002;
var boxes = [], sprites=[];
var colours = ["red.png","orange.png","yellow.png","green.png", "blue.png", "indigo.png", "violet.png"], c =0;
var sColours = ["red","orange","yellow","green", "blue", "indigo", "darkviolet"], s = 0;
var gameState = "play";
var check = false, result;
var Xa=250, Y=50, Xd = 250;


function preload() {
    restartImg = loadImage("restart.png");
    bgImg = loadImage("background.jpg");                          
}

function setup(){
    var canvas = createCanvas(windowWidth,windowHeight);
    engine = Engine.create();
    world = engine.world;

    ground = new Ground(width/2,height-10,width,50);
   // platform1 = new Ground(500, height-350, 200, 50);
    platform = new Ground(width-250, height-30, 200, 50);

    for(var i = 0; i<550 ; i=i+90 ) {
        console.log(colours[c])
        box = new block(50,i, colours[c]);
        boxes.push(box);
        c += 1;
    }
    console.log(boxes)
    /*
    box1 = new block(100,10, "red.png");
    box2 = new block(100,100, "orange.png");
    box3 = new block(100,200, "yellow.png");
    box4 = new block(100,300, "green.png");
    box5 = new block(100,400, "blue.png");
    box6 = new block(100,500, "indigo.png");
    box7 = new block(100,550, "violet.png");
    */
    angel = new Circle(500,50,130, "angel.png");
    devil = new Circle(500,50,100, "devil.png");

    Mouse = Matter.Mouse.create(canvas.elt);
    
    var options = {
        mouse : Mouse,
    }
    Mouse.pixelRatio = pixelDensity();
    attachment = Matter.MouseConstraint.create(engine,options); 
    World.add(world,attachment);

    attachment.collisionFilter.mask= boxCategory;

    for (var i = 420; i >= 0; i=i-70) {
        sprite = createSprite(width-100,height-90-i,50,50)
        sprite.shapeColor = sColours[s];
        sprite.visible = false; 
        s += 1;
        sprites.push(sprite); 
    }

    topEdge = new Ground(width/2,0,width,10);
    rightEdge = new Ground(0, height/2, 10, height);
    leftEdge = new Ground(width-20, height/2, 10, height);

    restart = createSprite(30,30,50,50);
    restart.addImage(restartImg);
    restart.scale = 0.025;   

}    

function draw() {    
    background(bgImg);
    
    Engine.update(engine);

    if(gameState === "play") {

        //console.log(boxes[6].body.position.y);
        for (i in sprites) {
            if (boxes[i].body.position.x > 1000 && boxes[i].body.position.x < 1200
                && boxes[i].body.position.y > 145+i*70 && boxes[i].body.position.y < 115+i*70+70) {
                //console.log(boxes[i].body.position.y);
                sprites[i].visible = true;
            }
            else {
                sprites[i].visible = false;
            }
        }

        if(sprites[4].visible==true) {
            check = true;
        }

        if(check === false) {
            angel.display();
            Xa +=1;
            if(Xa > width - 100){
                Xa = 250;
            }
            Matter.Body.setPosition(angel.body, {x:Xa, y: Y})
            
        }

        else {
            World.remove(world, angel.body);
            devil.display();

            if(sprites[3].visible === true || check === true) {
                Y += 2;
            }
            if(sprites[2].visible === true) {
                Y += 3;
            }
            if(sprites[1].visible === true) {
                Y += 4;
            }
            if(sprites[0].visible === true) {
                Y += 5;
            }

            if(Y>550) {
                Y = 50;
                Xd += 50;
            }
            if(Xd > width - 100){
                Xd = 250;
            }
            Matter.Body.setPosition(devil.body, {x:Xd, y: Y})
        }
        
        result = sprites.every(function (element) {
            return element.visible === true
        });
        

        //result = sprites[5].visible;

    if (result===true) {
        gameState = "end";
         swal({title: "Congrats!", 
               text: "You won!", 
               type: "success",
               },
                function(){ location.reload(); }
             );
        }
        
    }

    if(gameState=== "end") {
        
        for (i in boxes) {
            Matter.Body.setStatic(boxes[i].body, true);
        }
        devil.display();
        Matter.Body.setStatic(devil.body, true);
    }

    if(mousePressedOver(restart)) {
        location.reload();
    }
    
    ground.display();  
    platform.display();

    for(i in boxes) {
        boxes[i].display();
    }

    /*
    box1.display();
    box2.display();
    box3.display();
    box4.display();
    box5.display();
    box6.display();
    box7.display();
    */

    
    /*
    topEdge.display();
    rightEdge.display();
    leftEdge.display();
    */

    drawSprites();
}
