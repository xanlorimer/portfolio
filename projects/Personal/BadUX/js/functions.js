'use strict'

// jQuery test function
$(document).ready(function() {
    debug("jQuery is present");

    //$("button").click(function(){
    $("#evil").mousemove(function(event){
        bar();
    });

    // $("#evil").mousemove(function(event){
    //     foo();
        
    // });
});

function bar()
{
    $("#evil").hide(2000);
    setTimeout(1000);
    rab();
}

function rab()
{
    $("#evil").show(2000);
    setTimeout(1000);
    bar();
}


function foo()
{
    $(".evil").animate({
        height:'200px'
    },"slow");
}

debug("Hello!!!!");

// $(document).mousemove(function(event){
    
// });