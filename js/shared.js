'use strict'

let debugMode=false; // If set false, suppresses console output.

// Old habits die hard. A debug function to spit the supplied data to the console.
function debug(data)
{
    if(debugMode==true)
    {
        console.log("DEBUG: " +data);
    }
}

// Returns a dictionary of all cookies (or returns the first specific cookie key:value pair detected based on the provided search regex)
function getCookiesAsDict(search)
{
    let input = document.cookie.split('; '); // Start by splitting the cookie string along its natural separators
    let out = {}; // Init output

    if(search == undefined) // If not searching for something specific, return all extant cookies
    {
        for(var i=0;i<input.length;i++)
        {
            let cookie = input[i].split('='); // Split individual cookies so that they become arrays where i[0] = key and i[1] = value
            out[cookie[0]] = cookie[1]; // Add the key:value pair to the dictionary
        }
    }
    else
    {
        for(i=0;i<input.length;i++)
        {
            if(input[i].match(search))
            {
                let item = input[i].split('=');
                out[item[0]]=item[1];
                break;
            }
        }
    }
    return out;
}

// Modifies the data of the given cookie, or if the cookie doesn't exist, creates it. Expects data as "key=value"
function modifyCookie(data)
{
    let d = data.split("=");
    document.cookie = d[0] +"=" +d[1] +";SameSite=Lax;";
}

// Adds additional cookies. Accepts data in the form of an array of string-based key-value pairs: [k,v,k,v,k,v...]
function setCookies(data)
{
    let cookie = "";
    debug("Got data of length: " +data.length);
    for(var i=0;i<data.length/2;i++)
    {
        //                 (key)             (value)    (req. attribute)
        document.cookie = data[i*2] + "=" +data[i*2+1] +";SameSite=Lax;";
    }
    debug("Got cookie: " +cookie);  
}