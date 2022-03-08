'use strict'

// When #modebutton is clicked, the theme changes
$("#modebutton").click(function(){switchmode(true);});

// Called on page load to get darkmode cookie state and set style accordingly
$(document).ready(function(){switchmode(false);});

// Switches from light mode to dark mode, or vice-versa, depending on the value supplied. false=do nothing, true=toggle. switchmode(false) is the first thing called on page load to prevent blinding the user.
function switchmode(toggle)
{
    let modeState = getCookiesAsDict("mode");
    let mode = modeState["mode"];

    debug("Currently stored mode is: " +mode);

    if(mode == undefined) // If the cookie has not been set,
    {
        debug("Cookie init.");
        initCookies();
    }
    else if(mode == "dark")
    {
        debug("Applying mode. Toggle state: " +toggle);
        if(toggle == true)
        {
            mode = "light"; // Switch mode.
            modifyCookie("mode=" +mode);
        }
        document.getElementsByTagName("html")[0].className = mode; // Set the site to dark mode
    }
    else if(mode == "light")
    {
        debug("Applying mode. Toggle state: " +toggle);
        if(toggle == true)
        {
            mode = "dark"; // Switch mode.
            modifyCookie("mode=" +mode);
        }
        document.getElementsByTagName("html")[0].className = mode; // Set the site to light mode
    }
    else
    {
        debug("An undefined mode state has been reached. Mode state: " +modeState["mode"]);
    }
    debug("Newly stored mode is: " +mode);
}

// Initializes the cookies we use for this site. (They store scheduling info and power state info so that interfaces actually remember what you enter into them)
function initCookies()
{
    debug("(Re)Initializing cookies...");
    setCookies(["mode","light"]); // We initialize it as light mode.
}