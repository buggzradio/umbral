class Circle {
    constructor(x, y,r, colour) {
      
        var options = {
            'restitution':0.1,
            'friction':0.8,
            'density':0.1,
            collisionFilter: {
              category : circleCategory
            }
          }
        
        this.body = Bodies.circle(x, y, r, options);
        this.r = r;
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
          if(this.r === 130) {
            image(this.image, 0, 0, this.r, this.r); }
          else {
            image(this.image, 0, 0, this.r+100, this.r); }
          pop();
      }
    }
  
  
  