"use strict"
export default ["helper"];

// prefClosure - simple clusure for the global configuration 
// example :   let cnfg = prefClosure();
//             console.log(cnfg("name"));
//             cnfg("wurst","wasser");
//             console.log(cnfg("wurst"));
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
export function prefClosure() {
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
export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


// trackedKeys contains an array with the currently pressed keys. the event handler fires only if the key was just pressed down
// https://www.reddit.com/r/learnjavascript/comments/uegjd5/i_need_an_explanation_in_functional_programming/?utm_source=share&utm_medium=web2x&context=3
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
export function trackKeys(keys) {
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

// isNullish checks if all attributes in a object are null
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
export function isTrueish(o) {
    let ary = Object.values(o);
    if(ary.find(e => e === true))
        return true;
    return false;
}

export class Vec {
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
