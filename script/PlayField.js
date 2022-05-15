"use strict"

// class PlayField  : the size of the given window
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
export default class PlayField {
    sprites = [];           // array of sprites that should be animated

    // param is the array of sprites that should be animated
    constructor(s) {
        this.winXw = window.innerWidth;
        this.winYh = window.innerHeight; 

        this.sprites = s;
    }

    // get the dimensions when window size was changed
    resize() {
        this.winXw = window.innerWidth;
        this.winYh = window.innerHeight; 
    }

    
}



