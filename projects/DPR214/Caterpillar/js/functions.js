'use strict'

// jQuery test function
$(function() {
    debug("jQuery is present");

    // When the user clicks the button, we want to change the properties of the page.
    $("#button").on("click", function() {
        /* 
            Changes: 
                - title: "Caterpillar" --> "Butterfly"
                - h1: "Caterpillar" --> "Butterfly"
                - #infoParagraph html: "startText" --> "endText"
                - img src: "assets/images/caterpillar.jpg" --> "assets/images/butterfly.jpg"
                - #wikiLink src: "https://en.wikipedia.org/wiki/Catepillar" --> "https://en.wikipedia.org/wiki/Monarch_butterfly"
                - #button value: "metamorphose" --> "restore"

            And if the user clicks the button when its text is "Restore", the page should be reloaded: location.reload(); 
        */
        
        // First, we check if the text of the button has changed. If it has, we want to change the button's behavior to reload instead
        if($("#button").val() == "Restore")
        {
            location.reload();
        }

        $("title").text("Butterfly"); // Change the page title
        $("h1").html("Butterfly"); // Change the text of the header
        $("#infoParagraph").html("This is a <strong>Monarch butterfly</strong> in its natural habitat."); // Change info paragraph
        $("img").attr("src","assets/images/monarch.jpg");
        $("#wikiLink").attr("href","https://en.wikipedia.org/wiki/Monarch_butterfly");
        $("#button").val("Restore");
    });
});