'use strict'

// Important vars which determine program behavior
let randMode = false; // Random image rotation mode!
let timeout = 3; // Timeout, in seconds
let counter = 0; // Tracks which image (technically, which array location) we're at
let imageData; // Stores image data
let dataLength = 0; // Length of json data (number of images)
let order = []; // Tracks iteration order globally. Normally sequential, but shuffled under "random" mode
let timer = setTimeout(rotate,timeout*1000); // This keeps track of the timer object in use so we can cancel it

//let source = "https://pastebin.com/raw/dvB55nE2"; // Remote source (doesn't work due to CORS security settings)
let source = "./imagedata.json"; // Local source

// Runs on document load
$(document).ready(function() {
    debugMode = true; // Show debug messages

    // Set up interactive controls
    $("#mode").click(function(){modeChange()});
    $("#setdelay").click(function(){delayChange()});

    // Display the delay value
    $("#delayval").html(timeout);

    // Parse JSON data and set up image cycler
    $.getJSON(source, function(data){
        imageData = data;
        dataLength = imageData["imageData"].length;

        // Quick validation to show if we have good data
        debug("Got data resembling:" 
                +"\n\t" +data["imageData"][0].source 
                +"\n\t" +data["imageData"][0].alt 
                +"\n\t" +data["imageData"][0].link 
                +"\n\t" +data["imageData"][0].text 
                +"\nWith length: " +dataLength);

        // Modify behavior if using "random" mode
        if(randMode)
        {
            // Populate the last element of the order array with a random value to satisfy a check later on
            order[dataLength-1] = Math.floor(Math.random()*dataLength); 
            shuffle();
        }
        else
        {
            // If we're doing consecutive mode, simply populate the array as [1,2,3,4...]
            for(let i=0;i<dataLength;i++)
            {
                order[i] = i;
            }
        }
        debug("Generated initial order array: " +order);
        rotate(); // Make the first call to rotate(), since imageData has been populated
    }).fail(function(){
        debug("Error loading data from source: " +source); // Uh oh!
    });
});

// Responsible for changing between normal and random modes
function modeChange()
{
    if(randMode)
    {
        debug("Disabling random mode");
        $("#mode").attr("value","Enable Random Mode"); // Change button text to indicate state
        randMode = false;
    }
    else
    {
        debug("Enabling random mode");
        $("#mode").attr("value","Disable Random Mode"); // Change button text to indicate state
        randMode = true;
    }
    reset();
}

// Validates and sets the time delay if the user desires to change it
function delayChange()
{
    let readDelay = $("#delay").val(); // Get the input delay value
    let newDelay = parseFloat(readDelay); // Parse it

    if(isNaN(newDelay) || newDelay < 0) // Validate it
    {
        $("#delay").attr("class","invalid"); // Invalid delay -> delay field is highlighted red
    }
    else // Otherwise, make all the appropriate changes and call rotate();
    {
        $("#delay").attr("class","");
        timeout = newDelay;
        $("#delayval").html(timeout);
        clearTimeout(timer); // The user should not have to wait out the current timer period before seeing their changes
        rotate();
    }
}

// Rotates through the images, setting the requisite fields. Then, increments the counter.
function rotate()
{
    // We have three tags to worry about: cycler_image (holds the image src) 
    // cycler_text (holds the image text (<p> below)) 
    // cycler_link (<a>, holds the link that the image goes to)
    // (also, we care about the alt text on the image!)

    //debug("Changed image! Counter is: " +counter +" (image: " +order[counter] +")"); // Warning: can be spammy w/ low delays
    $("#cycler_image").attr("src",imageData["imageData"][order[counter]].source); // Set the image source
    $("#cycler_image").attr("alt",imageData["imageData"][order[counter]].alt); // Set the image alt text
    $("#cycler_link").attr("href",imageData["imageData"][order[counter]].link); // Set the image link (if available)
    $("#cycler_text").html(imageData["imageData"][order[counter]].text); // Set the text of the image tag

    counter++;
    if(counter == (dataLength))
    {
        reset();
        debug("Resetting! Counter: " +counter);
    }

    // Rotates every n milliseconds. setTimeout is more stable and allows for the 
    // delay to be changed, so it is what I ultimately went with over setInterval
    clearTimeout(timer); // I was experiencing weird conflicts without this. Comment this line out and change the delay through the interface to see what I mean.
    timer = setTimeout(rotate,timeout*1000); 
    debug("\t\tTimer is now: " +timer); // A new timer object is created each time...
}

// Resets the counter and if randMode = true, shuffles the array.
function reset()
{
    counter = 0;
    if(randMode == true)
    {
        shuffle();   
    }
}

// Shuffles the array so that each image is show exactly once and so that there are no repeats between shuffles
function shuffle()
{
    // First, we check if the array has been initialized before (to check for repeats between generated arrays)
    let lastElement = order[dataLength-1];
    debug("Order array has been initialized. Last element in current array (" +lastElement +") may not equal first element in next array.");    

    // Next, we generate a seed array containing [1,2,3...,n], where n is the length of imageData-1
    let seedArr = []
    for(let i=0; i<dataLength;i++)
    {
        seedArr[i] = i;
    }
    debug("Generated a seed array: " +seedArr);
    
    // Then, we populate the order[] array in much the same way, except instead of consecutively adding numbers we 
    // pull a random number and remove it from seedArr each time. In this way we can ensure no repeats.
    for(let i=0; i<dataLength;i++)
    {
        let choice = Math.floor(Math.random()*seedArr.length); // Get a random value from the current seed array
        order[i] = seedArr[choice]; // Set the ith value of order[] to the above random value
        seedArr.splice(choice,1); // Remove the chosen element from the seed array so that it cannot be picked again
    }

    // Finally, if they're the same, we swap the first and last elements to get rid of inter-array repeats.
    // (we don't want arr[last] (prev array) == arr[0] (curr array) because that would show the user the same image twice)
    if((order[0] == lastElement))
    {
        debug("Previous [last element] = current [first element]!\n\t" +order +"\nSwapping...");
        order[0] = order[dataLength-1]; // Set the first element of the current array = to the last element
        order[dataLength-1] = lastElement; // Complete the swap by setting the last element = to what the first was
    }

    // Report what's been generated
    debug("Generated the following Array: " +order);
}