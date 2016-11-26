//// Objects ////
function Planet(x,y,mass,vel){
    this.mass = mass*this.density;
    this.loc = new PVector(x,y);
    this.vel = vel;

    this.r = Math.cbrt((3*mass)/(4.0*Math.PI));
};
Planet.prototype.density = 5515.3;
Planet.prototype.move = function (){
    this.loc.add(this.vel);
    return this;
};
Planet.prototype.collide = function (p) {
    return (this.loc.dist(p.loc)<=p.r+this.r);
};
Planet.prototype.display = function() {
    ctx.beginPath();
    ctx.arc(this.loc.x,this.loc.y,this.r,0,2*Math.PI,false);
    ctx.fill();
    return this;
};
function PVector(x,y){

    if (typeof(fromAngle)=="number") {
        x = Math.cos(fromAngle);
        y = Math.sin(fromAngle);
    }
    this.x = x;
    this.y = y;
}
PVector.prototype.add = function(v) {
    this.x+=v.x;
    this.y+=v.y;
    return this;
};
PVector.prototype.sub = function(v) {
    this.x-=v.x;
    this.y-=v.y;
    return this;
};
PVector.prototype.mult = function(scalar) {
    this.x*=scalar;
    this.y*=scalar;
    return this;
};
PVector.prototype.div = function(scalar) {
    this.x/=scalar;
    this.y/=scalar;
    return this;
};
PVector.prototype.mag = function() {
    return Math.pow(Math.sqrt(this.x)+Math.sqrt(this.y),2);
};
PVector.prototype.magSq = function() {
    return Math.sqrt(this.x)+Math.sqrt(this.y);
};
PVector.prototype.setMag = function(m) {
    return this.mult(m/this.mag());
};
PVector.prototype.heading = function() {
    return Math.atan2(this.y,this.x);
};
PVector.prototype.dist = function(v) {
    dx = this.x - v.x;
    dy = this.y - v.y;
    return Math.sqrt(dx*dx + dy*dy);
};
