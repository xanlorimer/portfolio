'use strict'

let $ = function (id) {
    return document.getElementById(id);
};

// Populates the mad lib
function populateMadlib()
{
    // For these, we want to set the resulting value of x_o if and only if the user has submitted something in that field.
    // So we check to see if data is present in the field, and if it is, we set the value of the output field to what the user set
    // If no data is present, then we simply send a debug message that we're skipping that output field.
    $("pluralnoun").value ? document.getElementById("pluralnoun_o").innerHTML = modifyCase($("pluralnoun").value) : debug("Skipping");
    $("nounone").value ? document.getElementById("nounone_o").innerHTML = modifyCase($("nounone").value) : debug("Skipping");
    $("nountwo").value ? document.getElementById("nountwo_o").innerHTML = modifyCase($("nountwo").value) : debug("Skipping");
    $("nounthree").value ? document.getElementById("nounthree_o").innerHTML = modifyCase($("nounthree").value) : debug("Skipping");
    $("songname").value ? document.getElementById("songname_o").innerHTML = modifyCase($("songname").value) : debug("Skipping");
    $("verb").value ? document.getElementById("verb_o").innerHTML = modifyCase($("verb").value) : debug("Skipping");
    document.getElementById("outputs").className=""; // Show the output classes
    location.hash = "goagain"; // Jump to the bottom of the page upon submission
}

// Modifies case of input and returns input
function modifyCase(input)
{
    return input.toLowerCase(); // Set the text to lowercase & return it
}

// Wipes data from all fields and reloads page
function goAgain()
{
    // Reset all fields...
    let fields = document.getElementsByClassName("centered");
    for(let i=0; i<fields.length; i++)
    {
        fields[i].value="";
    }

    location.reload();
    return false;
}