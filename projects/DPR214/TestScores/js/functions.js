'use strict'

let namesArr = ['Ben', 'Joel', 'Judy', 'Anne'];
let scoresArr = [88, 98, 77, 88];

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

// Computes highscore and average, then updates the relevant fields with that info (but does not display)
function getResults() {
    let high = getHighScore();
    let avg = getAvgScore().toFixed(2);
    $('#highScore').html(high);
    $('#avgScore').html(avg);
}

// Computes high score and average, then displays them in the results div
function displayResults() {
    getResults(); // Compute highscore
    let results = $('#results');
    results.toggle();
}

// Updates scores_table with the contents of the arrays
function displayScores() {
    // Add your code here
}

function insertNewTableElement(newName, newScore) {
   
}

function initializeScoresTable() {
    // Remove header row from table
    $('#scores_table tr').slice(1).remove();
    for (let i = 0; i < scoresArr.length; i++) {
        insertNewTableElement($('#scores_table tr:last').after('<tr> <td>' + namesArr[i] + '</td><td>' + scoresArr[i] + '</td></tr>'));
    }
}

function addScore() {
    let score = $('#score');
    let name = $('#name');

    // Our fields are innocent until proven guilty:
    $('#score').attr("class","");
    $('#score').attr("class","");

    if (score.val() === '') {
        $('#score').attr("class","invalid");
        return;
    }
    else if(name.val() === '')
    {
        $("#name").attr("class","invalid");
    }
    else if(isNaN(score.parseFloat()))
    {
        $('#score').attr("class","invalid");
    }
    else if(name == "test") // Replace this with name regex /^[A-Za-z -']/ and !=
    {
        $("#name").attr("class","invalid");
    }
    
    scoresArr.push(parseInt(score.val()));
    namesArr.push($("#name").val());
    initializeScoresTable();
    score.val('');
    name.val('');
    getResults();
    $('#scores').show();
    $('#results').show();
    name.focus();
}

window.onload = function () {
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
    let score = $('#score');

    name.focus();
    getResults();
    initializeScoresTable();
}

//  Changes focus to next input on enter key
$(document).on('keypress', function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        
        // Get all focusable elements on the page
        let $canfocus = $(':focusable');
        let index = $canfocus.index(this) + 1;
        if (index >= $canfocus.length) index = 0;
        $canfocus.eq(index).focus();
    }
});