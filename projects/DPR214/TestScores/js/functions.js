'use strict'

let namesArr = ['Claude', 'Joel', 'Judy', 'Giulia'];
let scoresArr = [92.0, 98.0, 77.0, 90.0];

// Computes and returns the average of all scores in scoresArr
function getAvgScore() {
    let i = 0,
        sum = 0,
        len = scoresArr.length;
    for (i; i < len; i++) {
        sum += scoresArr[i];
    }
    return sum / len;
}

// Returns the max score and who got it
function getHighScore() {
    let i = 0,
        max = 0,
        len = scoresArr.length;
    let name = '';
    for (i; i < len; i++) {
        if (scoresArr[i] > max) {
            max = scoresArr[i];
            name = namesArr[i];
        }
    }
    return name + ' with score of ' + max;
}

// Computes highscore and average, then silently updates the relevant fields with that info
function getResults() {
    let high = getHighScore();
    let avg = getAvgScore().toFixed(2);
    $('#highScore').html(high);
    $('#avgScore').html(avg);
}

// Computes high score and average, then displays them in the results div
function displayResults(stateOverride) {
    getResults(); // Compute highscore
    let results = $('#results');
    
    if(stateOverride) // If state override is true
    {
        results.show();
    }
    else
    {
        results.toggle();
    }
        
    // Change the text of "Display Results" to "Hide Results" and back again, as appropriate
    if(results.attr("style") == "") // If the "style" attribute for "results" is null, it means that results are currently being shown.
    {
        $("#display_results").val("Hide Results");
    } 
    else 
    {
        $("#display_results").val("Display Results");
    }
}

// Updates scores_table with the contents of the arrays
function displayScores(stateOverride) {
    let scores = $("#scores");

    if(stateOverride) // If state override is true
    {
        scores.show();
    }
    else
    {
        scores.toggle();
    }

    // Change the text of "Display Scores" to "Hide Scores" and back again, as appropriate
    if(scores.attr("style") == "") // If the "style" attribute for "scores" is null, it means that scores are currently being shown.
    {
        $("#display_scores").val("Hide Scores");
    } 
    else 
    {
        $("#display_scores").val("Display Scores");
    }
}

function initializeScoresTable() {
    // Remove header row from table
    $('#scores_table tr').slice(1).remove();
    for (let i = 0; i < scoresArr.length; i++) {
        $('#scores_table tr:last').after('<tr> <td>' + namesArr[i] + '</td><td>' + scoresArr[i] + '</td></tr>');
    }
}

function validateFields() {
    let score = $('#score');
    let name = $('#name');

    let score_err = $("#score_err");
    let name_err = $("#name_err");

    // Our fields are innocent until proven guilty:
    score.attr("class","");
    name.attr("class","");
    score_err.html("&nbsp;");
    name_err.html("&nbsp;");

    const nameRegex = /[^A-Za-z \-']/; // Names may NOT contain any characters OTHER THAN: upper/lower case letters, spaces, apostrophes, and dashes

    // Check if score is blank
    if (score.val() == "") {
        score.attr("class","invalid");
        score_err.html("Score must have a value.");
    }

    // Ensure score > 0
    if(parseFloat(score.val()) < 0 || parseFloat(score.val()) > 100) {
        score.attr("class","invalid");
        score_err.html("Score must be between 0 and 100.");
    }
    
    // Check if name is blank
    if(name.val() == "")
    {
        name.attr("class","invalid");
        name_err.html("Name must have a value.");
    }
    
    // Check if score is parseable as a float
    if(isNaN(parseFloat(score.val())))
    {
        score.attr("class","invalid");
        score_err.html("Score must be numeric.");
    }
    
    // Check if name is valid
    if(nameRegex.test(name.val()))
    {
        name.attr("class","invalid");
        name_err.html("Name may only contain A-z, ', -, or space");
    }
}

// This function actually adds the score data to the tables and page (assuming everything's valid)
function addScore() {
    let score = $('#score');
    let name = $('#name');
    let score_err = $("#score_err");
    let name_err = $("#name_err");

    // If the field is invalid, do basically nothing:
    if(name.attr("class") == "invalid" || score.attr("class") == "invalid")
    {
        debug("Field is invalid.");
    }
    else // Otherwise,
    {
        name_err.html("&nbsp"); // Clear the errors
        score_err.html("&nbsp");

        scoresArr.push(parseInt(score.val())); // Add the values to their respective arrays
        namesArr.push($("#name").val());

        initializeScoresTable(); // Initialize the table
        score.val('');
        name.val('');
        displayScores(true);
        displayResults(true);
        name.focus();
        validateFields();
    }
}

// Handles persistent field validation and enter-based field selection
$(document).on('keyup', function(e) {
    if (e.key === "Enter") { // If enter is pressed,
        e.preventDefault(); // Prevent the default action
        debug("Enter was pressed");

        if($("#name").is(":focus")) // If the #name field is focused,
        {
            $("#score").focus(); // Change focus to the #score field.
        }
        else if($("#score").is(":focus")) // If the #score field is focused,
        {
            addScore(); // Try adding the score to the array (assuming it's valid)
        }
    }
    else // If any other key is pressed, try validating the fields
    {
        validateFields();
    }
});

// Runs on page load
window.onload = function () {
    debugMode = true;

    $('#display_results').on('click',  function() {
        displayResults();
    });

    $('#display_scores').on('click',  function() {
        displayScores();
    });

    $('#add').on('click',  function() {
        addScore();
    });

    let name = $('#name');
    name.focus();
    getResults();
    initializeScoresTable();
    validateFields(); // Initial validation
}