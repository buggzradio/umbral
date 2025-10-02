class block {
    constructor(x, y, colour) {
      
        var options = {
            'restitution':0.1,
            'friction':1,
            'density':0.5,
            collisionFilter: {
              category : boxCategory
            }
          }
        
        this.body = Bodies.rectangle(x, y, 70, 70, options);
        this.width = 70;
        this.height = 70;
        this.image = loadImage(colour);
        World.add(world, this.body);
      }
  
      display(){

          var pos = this.body.position;
          var angle = this.body.angle;
          push();
          translate(pos.x, pos.y);
          rotate(angle);
          imageMode(CENTER);
          image(this.image, 0, 0, this.width, this.height);
          pop();
      }
    }
  
  
  