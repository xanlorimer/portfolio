let limitFlag = true; // Tracks whether the user's clicks are registered
let lightningArray = ["#lightning1","#lightning2","#lightning3"]; // Allows for random selection of lightning
let audio = false; // Handles audio muting. Muted by default.

$(function() {
    debugMode = true;
    limit = 300; // Limit between user clicks in ms. If higher than "delay", should prevent any animation errors from occurring.
    lightning(); // Initial call

    // I felt bad not adding a mute button
    $("#mute").on("click",function(){
        audio = !audio; 
        if(audio) {
            $("#mute").html("Mute Audio");
        } else {
            $("#mute").html("Unmute Audio");
        }
    });

    // We don't want a drop down menu appearing when users right-click face elements. This disables it.
    $(".face").contextmenu(function() {
        return false;
    });

    // Whenever a mouse button is pressed,
    $(".face").mousedown(function(event) {
        if(limitFlag) // First, see if we're going to register the click
        {
            limitFlag = false; // Since we are registering the click, reset the rate limit timer
            setTimeout(limiter,limit);

            let button = event.which; // Mouse button id: 1=left, 2=middle (unused), 3=right
            let amount = -367; // The number of pixels to scroll over (width of image segment)
            let delay = 250; // Delay in ms for the animation to require.
            let offset = $(this)[0].offsetLeft; // Get the current offset of the clicked-on div
            let override = ""; // Initialize the override parameter in case we have to loop around to the beginning/end

            if(button == 1) // Left click
            {
                amount *= -1; // Change scroll direction
            }
    
            // The below algorithm snaps the amount value to a potentially valid image index (i.e., a multiple of -367)
            let destination = (Math.floor(offset / -367) * -367) + amount;
            debug("DESTINATION SET: " +destination);

            // Set the boundaries:
            if(destination > -367) // If we're looping too far into the positive direction (usually: TO zero)
            {
                debug("Destination was greater than -367, so we're going to loop around to the end of the strip after destination is reached.")
                override = "-3670px";
            }
            else if(destination < -3670) // If we're going out of range in the negative direction, (usually: TO -4771)
            {
                debug("Destination was less than -4404, so we're going to loop back to the beginning of the strip after destination is reached.");
                override = "-367px";
            }

            // Do the animation
            $(this).animate({left:+destination +"px"}, delay, function() // By not incrementing the "left" amount by 367, we can more strictly control what values left: can be.
            {
                if(override != "") // If the override has been set,
                {
                    $(this).css("left",override); // Snap the image loop to a safe location after completing the animation
                }
            });
        }
        else
        {
            debug("Rate limited!");
        }
    });
});

// Resets click limiter
function limiter(){
    limitFlag = true;
}

// Creates random lightning strikes in the background
function lightning(){
    let lightningSelect = Math.round(Math.random()*2); // Choose a random integer between 0 and 2, inclusive.
    let lightningInterval = Math.round(Math.random()*3000) + 3000; // Lightning will occur every 3-6 seconds (3000 + [0-3000])ms
    $(lightningArray[lightningSelect]).fadeIn(250).fadeOut(600);
    
    if(audio) {
        $("#thunder")[0].play(); // Play audio if it's unmuted
    }
    
    setTimeout(lightning,lightningInterval); // Recursively call the function
}