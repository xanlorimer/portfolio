'use strict'

// Xan Lorimer | 2/6/22 | Written for DPR214

var $ = function(id) {
    return document.getElementById(id);
};

window.onload = function() {
    $("reload").onclick = reload;
    debugMode = true;
    debug("Test");
};

function reload() {
    location.reload();
}

// First, we get the user's input and validate it:
let checkFlag = true;
while(checkFlag)
{
    let input = prompt("Please enter an integer:");
    input = parseInt(input); // Parse an integer from the input
    if(!isNaN(input)) // Check that an integer was actually supplied
    {   
        checkFlag = false; // Break the loop
        numberTrick(input); // Run the number trick
    }
}

// Perform the number trick:
function numberTrick(val)
{
    let initial = val; // Store the initial value since we'll need it later
    document.write("<h1>~ Number Trick ~</h1>");
    document.write("<p>You entered: " +val +"</p>");
    document.writeln("<p>" +val +" plus 9 is " +(val+=9) +"</p>");
    document.writeln("<p>" +val +" times 2 is " +(val*=2) +"</p>");
    document.writeln("<p>" +val +" minus 4 is " +(val-=4) +"</p>");
    document.writeln("<p>" +val +" divided by 2 is " +(val/=2) +"</p>");
    document.writeln("<p>And " +val +" minus " +initial +" is " +(val-initial) +"</p>");
    alert("And we arrive at " +(val-initial) +"!"); // Required alert
    document.write("<p>It always comes back to seven!</p>");
}