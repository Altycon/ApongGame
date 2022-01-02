
const log = console.log;

let NumberArray = Array.from(Array(10).keys(), n => n + 1); 
// Array(10) [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
let NumberArray2 = Array.from({ length: 10 }, (_, i) => i);
//Array(10) [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

function getRandomInt(max){
    return Math.floor(Math.random()*max);
}
function randomRange(min,max){
    return Math.random() * (max - min) + min;
}
/*
    This example returns a random integer between the specified values. 
    The value is no lower than min (or the next integer greater than min 
    if min isn't an integer), and is less than (but not equal to) max.
*/

function getRandomFromRangeInc(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min) + min);
}

/*
    While the getRandomInt() function above is inclusive at the minimum, 
    it's exclusive at the maximum. What if you need the results to be inclusive 
    at both the minimum and the maximum? The getRandomIntInclusive() function below accomplishes that.
*/

function getRandomFromRangeExc(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min + 1) + min);
}


// Mapping a return value range to other ranges
// Same as P5.js map() function
function scale (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

// clamp function for keeping value between a range
// Used in collision detection between circle and rectangle

function clamp(min,max,value){
    return Math.max(min, Math.min(max,value));
}

// This calculates the relative brightness of colors for the alpha value of rgba
// Use in place of the alpha value from an image array. 
// Ex. const brightness = calculateRelativeBrightness(red,green,blue);

function calculatRelativeBrightness(red,green,blue){
    return Math.sqrt(
        (red * red) * 0.299 +
        (green * green) * 0.587 +
        (blue * blue) * 0.114
    )/100;
}
