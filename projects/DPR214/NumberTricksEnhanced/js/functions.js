'use strict'

// Xan Lorimer | 2/8/22 | Written for DPR214

var $ = function(id) {
    return document.getElementById(id);
};

window.onload = function() {
    $("reload").onclick = reload;
    debugMode = true;
    debug("Test");
    parseURLData();
};

function reload() {
    location.reload();
}

// a-(b/2) = desiredValue (7 by default)
let a = 9;
let b = 4;

// First, we get the user's input and validate it:
let checkFlag = true;
let input = prompt("Please enter an integer:");
input = parseInt(input);
while(checkFlag)
{
    if(!isNaN(input)) // Check that an integer was actually supplied
    {   
        checkFlag = false; 
        numberTrick(input); // Run the number trick
        break; // Break the loop
    }
    input = prompt("You must enter an integer! (Like -2, -1, 0, 1, 2...)"); // Give the user some instruction
    input = parseInt(input); // Parse an integer from the input
}

// Perform the number trick:
function numberTrick(val)
{
    parseURLData();
    debug("DEBUG: A IS: " +a +" AND B IS: " +b);
    let initial = val; // Store the initial value since we'll need it later
    document.write("<p>This is the number trick. You enter a number, it goes through a series of operations, and no matter what number is chosen, it always ends up at the same final value.</p>");
    document.write("<h1>~ Number Trick ~</h1>");
    document.write("<p>You entered: " +val +"</p>");
    document.write("<p>" +val +" plus " +a +" is " +(val+=a) +"</p>");
    document.write("<p>" +val +" times 2 is " +(val*=2) +"</p>");
    document.write("<p>" +val +" minus " +b +" is " +(val-=b) +"</p>");
    document.write("<p>" +val +" divided by 2 is " +(val/=2) +"</p>");
    document.write("<p>And " +val +" minus " +initial +" is " +(val-initial) +"</p>");
    //alert("And we arrive at " +(val-initial) +"!"); // Required alert
    document.write("<p>It always comes back to " +(a-(b/2)) +"!</p>");
    document.write("</br>");
}

// Uses data passed through GET
// (utilized this SO thread: https://stackoverflow.com/questions/814613/how-to-read-get-data-from-a-url-using-javascript)
function parseURLData()
{
    let url = new URL(window.location);             // Get URL data
    let input = url.searchParams.get("desired");    // Search for desired value
    input = parseInt(input);
    
    if(!isNaN(input))
    {
        // Relying on a-(b/2)=c, where c is the desired output, a > c, and an even integer b makes it all true
        // We add a random number between 1 and 50% of the input, plus four, to the input. This gets us our "a".
        // We add four because for low input values, a would often be equal to the input, which is boring.
        a = input + Math.floor(Math.random()*(0.5*input)) + 4;
        // Then, we calculate the difference between toAdd and input, and multiply by two. This gets us our "b".
        b = (a - input) * 2;

        debug("Got 'a' value: " +a +", and 'b' value: " +b +". a-(b/2)=" +(a-(b/2)) +" (should == desired)");
    }
    else
    {
        debug("Invalid 'desired' value: " +url.searchParams.get("desired"));
    }
}