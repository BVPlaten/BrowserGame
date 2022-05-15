"use strict"

import Sprite from "./Sprite.js"
import {prefClosure, trackKeys} from "./helper.js"

// https://medium.com/dailyjs/how-to-build-a-simple-sprite-animation-in-javascript-b764644244aa



let plyOneCtrlKys = ["ArrowLeft", "ArrowRight", "ArrowUp","ArrowDown", "0"];
let plyTwoCtrlKys = ["a", "s", "w","y", " "];
let keyLst = [ ...plyOneCtrlKys, ...plyTwoCtrlKys]

let config = prefClosure();
config("bgImg", document.getElementById("sprite") );
config("position" , 48); //start position for the image slicer
config("framePause", 100);
config("diff", 0);
config("stepSizeX" , 8);
config("stepSizeY" , 5);
config("stepX" , 0);
config("stepY" , 0);
config("playerOneKeys" , plyOneCtrlKys);
config("playerTwoKeys" , plyTwoCtrlKys);
config("trackedKeys",keyLst);


// animate bringe the action by repainting the window with requestAnimationFrame
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function animate(time, lastTime) {
    if (lastTime != null) {
        let diff = time - lastTime;
        console.log(config("trackedKeys"));
        //runnerOne.animateSprite(diff);
        for(let s of myListOfSprites)
        {
            s.animateSprite(diff)
        }
    }
        requestAnimationFrame(newTime => animate(newTime, time));
}


let runnerOne = new Sprite("runnerOne");
let runnerTwo = new Sprite("runnerTwo");

let myListOfSprites = [runnerOne,runnerTwo];

requestAnimationFrame(animate);