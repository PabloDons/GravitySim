var planets;
var G, newpr;
var pcreatelvl, gridsize;
var newcenter;

var scaling = 1;
var cStartX, cStartY;
var dX = 0, dY = 0;
var trackPlanet = null;

var c, ctx;
var frameRate;

//// static ////
function cloneObject(obj) {
    if (null == obj || "object" != typeof obj) {return obj;}
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) {copy[attr] = obj[attr];}
    }
    return copy;
}

function drawDebug(lines) {
    var tmp = "";
    var keys = [];
    for (l in lines) {
        if (l.length>tmp.length) {
            tmp = l;
        }
        if (lines.hasOwnProperty(l)) {
            keys.push(l);
        }
    }
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(8, 8, (lines[tmp].length+tmp.length)*8+32, keys.length*15+16);
    ctx.fillStyle = "#FFFFFF";
    ctx.font="12px Arial";

    for (var i=0;i<keys.length;i++) {
        ctx.fillText(keys[i].concat(": ").concat(lines[keys[i]]), 20,25+15*i);
    }
}

function draw() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    ctx = c.getContext("2d");
    ctx.save();
    if (trackPlanet != null) {
        dX = window.innerWidth/2 - trackPlanet.loc.x;
        dY = window.innerHeight/2 - trackPlanet.loc.y;
    } else {
        dX = window.innerWidth/2;
        dY = window.innerHeight/2;
    }

    ctx.strokeStyle = "rgb(235,235,235)";
    for (i=dX-Math.floor(dX/gridsize+1)*gridsize; i<window.innerWidth; i+=gridsize) {
        for (j=dY-Math.floor(dY/gridsize+1)*gridsize; j<window.innerHeight; j+=gridsize) {
            ctx.strokeRect(i, j, gridsize, gridsize);
        }
    }



    //pushMatrix();
    ctx.fillStyle = "rgb(170,170,170)";
    ctx.translate(dX, dY);
    //
    //scale(scaling);

    ctx.fillStyle = "rgb(170,170,170)";


    for (var i=0; i<planets.length; i++) {
        var planeti = new Planet(planets[i].loc.x,planets[i].loc.y,planets[i].mass/planets[i].density,planets[i].vel);
        for (var j=i+1; j<planets.length; j++) {
            var planetj = new Planet(planets[j].loc.x,planets[j].loc.y,planets[j].mass/planets[i].density,planets[j].vel);
            if (planetj.collide(planeti)) {
                console.log(i,j);
                console.info("planet at ["+planeti.loc.x+", "+planeti.loc.y+"] collides with planet at ["+planetj.loc.x+", "+planetj.loc.y+"]");
                /*planets.splice(j,1);
                planets[i] = new Planet(
                    (planeti.loc.x*planeti.mass + planetj.loc.x*planetj.mass)
                    /(planeti.mass + planetj.mass),
                    (planeti.loc.y*planeti.mass + planetj.loc.y*planetj.mass)
                    /(planeti.mass + planetj.mass),
                    (planeti.mass+planetj.mass)/5513.3,
                    planeti.vel.mult(planeti.mass)
                    .add(planetj.vel.mult(planetj.mass))
                    .div(planeti.mass+planetj.mass)
                );
                planeti = new Planet(planets[i].loc.x,planets[i].loc.y,planets[i].mass/planets[i].density,planets[i].vel);
                j-=1;
                continue;*/
            }
            var distance = planets[i].loc.dist(planets[j].loc);
            ai = Math.atan2(planets[j].loc.y-planets[i].loc.y, planets[j].loc.x-planets[i].loc.x);

            //aj = new PVector(planeti.loc.x-planetj.loc.x, planeti.loc.y-planetj.loc.y).heading();

            // F = m*a => a = F/m
            // F = G(m1*m2)/r^2
            // Earth density = 5513.3 kg/m^3
            var F = G/(distance*distance);
            var Nv = new PVector(fromAngle = ai);
            planets[i].vel.add(Nv.mult(F*planets[j].mass));
            planets[j].vel.add(Nv.mult(-planets[i].mass/planets[j].mass));
        }
        planets[i].move().display();
    }

    ctx.restore();

    drawDebug({
        "framerate": Math.round(frameRate).toString(),
        "dX, dY": Math.round(dX).toString().concat(", ").concat(Math.round(dY).toString()),
        "Scale": scaling.toString(),
        "Planets": planets.length.toString(),
        "Planet 0": Math.round(planets[0].loc.x).toString().concat(", ").concat(Math.round(planets[0].loc.y).toString()),
    });

    console.info("__interationEnd__");
}

function setup() {
    c = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    frameRate = 60;
    G = 6.674 * Math.pow(10, -7);
    pcreatelvl = 0;
    gridsize = 60;
    planets = [];
    planets.push(new Planet(20, 0, 15000, new PVector(0, -0.8)));
    planets.push(new Planet(-20, 0, 15000, new PVector(0, 0.8)));
    planets.push(new Planet(-140, 0, 100, new PVector(0, 1.2)));
    planets.push(new Planet(-160, 0, 600, new PVector(0, 0.8)));
    //planets.push(new Planet(3*width/4, height/2, 600, new PVector(0, 1)));
    //planets.push(new Planet(width/4+50, height/2-140, 900, new PVector(-0.6, 0.4)));
    //interval = setInterval(draw,1000/frameRate);
    console.info("__setupEnd__");
    interval = setInterval(draw,1000/frameRate);
}
