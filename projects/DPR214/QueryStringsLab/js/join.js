'use strict'

// Code attribution for this one goes to DCCC.
debugMode=true;

var $ = function(id) {
    return document.getElementById(id);
};

// Sends the user along to confirmed.html when they confirm their data
function confirm(){
    debug("Data confirmed, going to confirmed.html")
    window.location.replace("confirmed.html");
}

function goback(){
    debug("User clicked 'go back'. Going back...");
    window.location.assign("index.html");
}

// Gets the value of the provided key. Returns null if the key has no associated value.
const getQueryStringParamValue = (paramKey) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const paramValue = urlParams.get(paramKey);

    if(paramValue != "")
    {
        debug("For URL parameter: " +paramKey +" got value: " +paramValue);
    }
    else
    {
        debug("For URL parameter: " +paramKey +" no value exists.");
    }
    
    return paramValue;
}

// When the window loads, we show the user what they've entered to confirm
window.onload = function() {
    let firstName = getQueryStringParamValue("first_name");
    let emailAddr = getQueryStringParamValue("email_address1");
    $("confirm").onclick = confirm;
    $("goback").onclick = goback;
    $("confirm").focus();
    $("fname").innerHTML = firstName;
    $("email").innerHTML = emailAddr;

    // This (the below) is part of a nitpick on my part. When the user clicks "Go Back", I want the
    // fields on the previous page to be populated with the data they typed in, because it's likely
    // that most of the data is good, and that there's only a small spelling error or something. This
    // saves them a bit of typing.
    $("first_name").value = firstName;
    $("email_address").value = emailAddr;
};