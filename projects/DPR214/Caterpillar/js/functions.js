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
                - Change color of text
                - Prepend an informational list to "#buttonsDiv"
                - Add the class "result" to the informational list (unused, but required)

            Finally, if the user clicks the button when its text is "Restore", the page should be reloaded: location.reload();
        */
        
        // First, we check if the text of the button has been changed to "Restore" (indicating that the user pressed "Metamorphose"). 
        // If it has, we want to change the button's behavior to reload instead:
        if($("#button").val() == "Restore")
        {
            location.reload();
        }
        else
        {
            $("title").text("Butterfly"); // Change the page title
            $("h1").html("Butterfly"); // Change the text of the header
            $("#infoParagraph").html("This is a <strong>Monarch butterfly</strong> in its natural habitat."); // Change info paragraph
            $("img").attr("src","assets/images/monarch.jpg"); // Change image source and alt text
            $("img").attr("alt","Image of a Monarch butterfly");
            $("#wikiLink").attr("href","https://en.wikipedia.org/wiki/Monarch_butterfly"); // Change wiki link
            $("#wikiLink").html("Information about Monarch butterflies");
            $("#button").val("Restore"); // Change the value of the button. Acts as a flag.
            $("#buttonsDiv").prepend("<ul id='infoList' class='colorable' style='text-align:left; margin-left:25%; margin-right:25%;'><li>Butterflies (including the Monarch) are important pollinators.</li><li>Monarch butterflies have co-evolved with the milkweed plant, which is important to their entire life cycle.</li><li>Extensive consumption of milkweed (which contains certain toxins) renders Monarch butterflies unpalatable to predators.</li><li>Monarch populations are in decline, probably due to a combination of factors such as climate change, overuse of herbicides, destruction of milkweed habitat, and deforestation.</li><li>People who study Monarch butterflies are known as 'Monarchists'. <span style='font-size:50%'>(not really)</span></li></ul>"); // Add facts
            $(".colorable").css("color","rgb(235, 185, 20)"); // Change color on certain items
            $("input").css("background-color","rgb(235, 185, 20)"); // Also change the background color of the button
            $("#infoList").attr("class","result"); // Set the class of the info list...
        }
    });
});