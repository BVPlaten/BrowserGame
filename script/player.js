"use strict"
import greetBernd from "./helper.js";

// https://medium.com/dailyjs/how-to-build-a-simple-sprite-animation-in-javascript-b764644244aa


let config = prefClosure();
config("bgImg", document.getElementById("sprite") );
config("position" , 48); //start position for the image slicer
config("framePause", 100);
config("diff", 0);
config("stepSizeX" , 8);
config("stepSizeY" , 5);
config("stepX" , 0);
config("stepY" , 0);
config("trackedKeys",trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp","ArrowDown", " "]));

let Gunner = class Gunner {
    // constructor : sets the private attributes
    // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  
    constructor(htmlId){
        this.bgImg = document.getElementById(htmlId);
        this.position = 48; //start position for the image slicer
        this.framePause = 75;
        this.diff = 10;
        this.stepSizeX = 12;
        this.stepSizeY = 10;
        this.stepX = 0;
        this.stepY = 0;
    }

    // animateGunner : function is called every time the window is going to be repainted
    // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  
    animateGunner = function(diff) {
        // only 10 frames per second
        this.diff = this.diff + diff;
        if(this.diff <= this.framePause)
            return;

        //let wurst = document.body.style.background;
        if(document.body.style.background !== "") {
            document.body.style.background = "";
        }

        // animate only if a key is pressed
        if(!isTrueish(config("trackedKeys"))) {
            return;
        }

        this.bgImg.style.backgroundPosition = `-${this.position}px 0px`; 
        if (this.position < 288)
            { this.position = this.position + 48;}
        else
            { this.position = 48; }
        this.diff = 0;

        this.changeDirection(config("trackedKeys"));
        this.movingSprite(config("trackedKeys"));
    }

    // changeDirection : change the imgae according to it new direction and change the animation stepper
    // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  
    changeDirection = function(keys) {
        let transform = null;
        if (keys['ArrowRight']) {
            transform = 'scaleX(1)';
            this.stepX = +(this.stepSizeX);
            this.stepY = 0;
        } else if (keys['ArrowLeft']) {
            transform = 'scaleX(-1)';
            this.stepX = -(this.stepSizeX);
            this.stepY = 0;
        } else if (keys['ArrowUp']) {
            transform = 'rotate(-90deg)';
            this.stepX = 0
            this.stepY = -(this.stepSizeY);
        } else if (keys['ArrowDown']) {
            transform = 'rotate(90deg)';
            this.stepX = 0;
            this.stepY = +(this.stepSizeY);;        
        } else if (keys[' ']) {
            document.body.style.background = "pink";
        }        
        this.bgImg.style.transform = transform;    
    }

    // movingSprite : change the position of the div in the window by changing the style 
    // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  
    movingSprite = function(keys) {
        let yCoord = parseInt( (window.getComputedStyle(document.querySelector('#sprite')).top).slice(0,-2) );
        let xCoord = parseInt( (window.getComputedStyle(document.querySelector('#sprite')).left).slice(0,-2) );

        //let keys = config("trackedKeys");
        if (keys.ArrowRight) {
            xCoord += this.stepSizeX;
        } else if (keys.ArrowLeft) {
            xCoord -= this.stepSizeX;
        } else if (keys.ArrowUp) {
            yCoord += this.stepY;
        } else if (keys.ArrowDown) {
            yCoord += this.stepY;        
        }
        this.bgImg.style.left = xCoord + 'px';
        this.bgImg.style.top = yCoord + 'px';
        return;
    }
}


let Vec = class Vec {
    constructor(x, y) {
        this.x = x; this.y = y;
    }
    plus(other) {
        return new Vec(this.x + other.x, this.y + other.y);
    }
    times(factor) {
        return new Vec(this.x * factor, this.y * factor);
    }
}

// class Arena  : the size of the given window
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
let Arena = class Arena {
    constructor() {
        this.winXw = window.innerWidth;
        this.winYh = window.innerHeight; 
    }

    resize() {
        this.winXw = window.innerWidth;
        this.winYh = window.innerHeight; 
    }
}

// prefClosure - simple clusure for the global configuration 
// example :   let cnfg = prefClosure();
//             console.log(cnfg("name"));
//             cnfg("wurst","wasser");
//             console.log(cnfg("wurst"));
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function prefClosure() {
    let options = Object.create(null);
    return function(key,val = null) {
        if(val===null)
            return options[key];
        else {
            options[key] = val
        }
    }
}


// getRandomInt gives a rondom int 
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


// isNullish checks if all attributes in a object are null
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function isTrueish(o) {
    let ary = Object.values(o);
    if(ary.find(e => e === true))
        return true;
    return false;
}


// trackedKeys contains an array with the currently pressed keys. the event handler fires only if the key was just pressed down
// https://www.reddit.com/r/learnjavascript/comments/uegjd5/i_need_an_explanation_in_functional_programming/?utm_source=share&utm_medium=web2x&context=3
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function trackKeys(keys) {
    let down = Object.create(null);
    function track(event) {
      if (keys.includes(event.key)) {
        down[event.key] = event.type == "keydown";
        event.preventDefault();
      }
    }
    window.addEventListener("keydown", track);
    window.addEventListener("keyup", track);
    return down;
}


// animate bringe the action by repainting the window with requestAnimationFrame
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function animate(time, lastTime) {
    if (lastTime != null) {
        let diff = time - lastTime;
        console.log(config("trackedKeys"));
        gunnRunner.animateGunner(diff);
    }
        requestAnimationFrame(newTime => animate(newTime, time));
}


let gunnRunner = new Gunner("sprite");
let playField = new Arena();

greetBernd("Hallo Bernd")

requestAnimationFrame(animate);