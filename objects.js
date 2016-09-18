//// Objects ////
function Planet(x,y,mass,vel){
    this.density = 5515.3;
    this.mass = mass*this.density;
    this.loc = new PVector(x,y);
    this.vel = vel;

    this.r = Math.cbrt((3*mass)/(4.0*Math.PI));
    this.move = function (){
        this.loc.add(this.vel);
        return this;
    };
    this.collide = function (p) {
        return (this.loc.dist(p.loc)<=p.r+this.r);
    };
    this.display = function() {
        ctx.beginPath();
        ctx.arc(this.loc.x,this.loc.y,this.r,0,2*Math.PI,false);
        ctx.fill();
        return this;
    };
    console.log(this);
}

function PVector(x,y){

    if (typeof(fromAngle)=="number") {
        x = Math.cos(fromAngle);
        y = Math.sin(fromAngle);
    }
    this.x = x;
    this.y = y;
    //functions
    this.add = function(v) {
        this.x+=v.x;
        this.y+=v.y;
        return this;
    };
    this.sub = function(v) {
        this.x-=v.x;
        this.y-=v.y;
        return this;
    };
    this.mult = function(scalar) {
        this.x*=scalar;
        this.y*=scalar;
        return this;
    };
    this.div = function(scalar) {
        this.x/=scalar;
        this.y/=scalar;
        return this;
    };
    this.mag = function() {
        return Math.pow(Math.sqrt(this.x)+Math.sqrt(this.y),2);
    };
    this.magSq = function() {
        return Math.sqrt(this.x)+Math.sqrt(this.y);
    };
    this.setMag = function(m) {
        return this.mult(m/this.mag());
    };
    this.heading = function() {
        return (-Math.atan2(-this.y,this.x));
    };
    this.dist = function(v) {
        dx = this.x - v.x;
        dy = this.y - v.y;
        return Math.sqrt(dx*dx + dy*dy);
    };
}
