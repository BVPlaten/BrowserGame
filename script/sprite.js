"use strict"
import {prefClosure, isTrueish, trackKeys} from "./helper.js"

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

/*
 * Sprite : Animated and  moveable
 *
 * */
export default class Sprite {
    action = undefined;         // can be 'fire' or the direction of the sprite
    id = undefined;             // the DOM id of the sprite element
    position = 48;              // current position in the animation-frame
    bgSizeX = 288;              // width of the background image
    animDeltaX = 48;            // single animation step in pixel
    framePause = 75;            // pause in milliseconds between 2 anim-frames are painted 
    diff = 10;                  // added int-value per frame to determine the framerate
    stepSizeX = 8;              // pixeldelta for X-Axis in one animation-frame
    stepSizeY = 8;              // pixeldelta for Y-Axis in one animation-frame

    // constructor : sets the private attributes
    // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  
    constructor(id){
        this.bgImg = document.getElementById(id);
        this.id = id;
    }

    // animateSprite : function is called every time the window is going to be repainted
    // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  
    animateSprite = function(diff) {
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
        if (this.position < this.bgSizeX)
            { this.position = this.position + this.animDeltaX;}
        else
            { this.position = this.animDeltaX; }
        this.diff = 0;

        this.changeDirection(config("trackedKeys"));
        this.movingSprite(config("trackedKeys"));
    }

    // changeDirection : change the imgae according to it new direction and change the animation stepper
    // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  
    changeDirection = function(keys) {
        let transform = null;
        if (keys[' ']) {
            document.body.style.background = "pink";
            this.action = "fire";
        } else if (keys['ArrowRight']) {
            transform = 'scaleX(1)';
            this.action = 'right';
        } else if (keys['ArrowLeft']) {
            transform = 'scaleX(-1)';
            this.action = 'left';
        } else if (keys['ArrowUp']) {
            transform = 'rotate(-90deg)';
            this.action = 'up';
        } else if (keys['ArrowDown']) {
            transform = 'rotate(90deg)';
            this.action = 'down';
        }        
        if(!Object.is(this.action,"fire"))
            this.bgImg.style.transform = transform;    
    }

    // movingSprite : change the position of the div in the window by changing the style 
    // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  
    movingSprite = function(keys) {
        //let yCoord = parseInt( (window.getComputedStyle(document.querySelector('#sprite')).top).slice(0,-2) );
        //let xCoord = parseInt( (window.getComputedStyle(document.querySelector('#sprite')).left).slice(0,-2) );
        let yCoord = parseInt( (window.getComputedStyle(document.getElementById(this.id)).top).slice(0,-2) );
        let xCoord = parseInt( (window.getComputedStyle(document.getElementById(this.id)).left).slice(0,-2) );

        //let keys = config("trackedKeys");
        if (keys.ArrowRight) {
            xCoord += this.stepSizeX;
        } else if (keys.ArrowLeft) {
            xCoord -= this.stepSizeX;
        } else if (keys.ArrowUp) {
            yCoord -= this.stepSizeY;
        } else if (keys.ArrowDown) {
            yCoord += this.stepSizeY;        
        }
        this.bgImg.style.left = xCoord + 'px';
        this.bgImg.style.top = yCoord + 'px';
        return;
    }
}


