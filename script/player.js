/*
function animateScript() {
    document.getElementById("image").style.backgroundPosition = `96px 0px`;
}


console.log("Skript loaded");
document.getElementById("image").onmouseover = mouseOverAnim();

function mouseOverAnim() {
    console.log("mouse over");
    //player.style.backgroundPosition = '48px 0px';
    document.getElementById("image").style.backgroundPosition = `96px 0px`;
}
*/

// https://medium.com/dailyjs/how-to-build-a-simple-sprite-animation-in-javascript-b764644244aa

let gunner = document.getElementById("image");
flipGunner();
gunner.addEventListener("mouseover",(e) => {
    // set the animation to a different pict inside the snake of pictures
    // gunner.style.backgroundPosition = `96px 0px`
    animateGunner(e);
} );

function animateGunner(event) {
    var    position = 48; //start position for the image slicer
    const  interval = 100; //100 ms of interval for the setInterval()

    tID = setInterval ( () => {
    gunner.style.backgroundPosition = `-${position}px 0px`; 
    //we use the ES6 template literal to insert the variable "position"
    if (position < 288)
    { position = position + 48;}
    //we increment the position by 256 each time
    else
    { position = 48; }
    //reset the position to 256px, once position exceeds 1536px
    }
    , interval ); 
}

function flipGunner() {
    let transform = 'scaleX(-1)'
    const  interval = 1000; //100 ms of interval for the setInterval()

    tID = setInterval ( () => {
        if(transform === 'scaleX(-1)') {
            transform = 'scaleX(1)';
        }
        else {
            transform = 'scaleX(-1)'
        }

        Object.assign(gunner.style, {
            transform
        });    }
    , interval );     


}