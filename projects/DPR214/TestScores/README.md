# Header
Test scores app...

### About
A simple app for keeping track of test scores. Don't actually use this; data will not persist across reloads. 

### To do
- [x] displayResults() calculates avg score and highest score from arrays and displays 
results in the "result" div.
- [x] displayScores() gets names and scores from the arrays and displays them as rows in
"scores_table"
- [x] addScore() adds name and score to the two arrays
- [x] Add data validation to addScore(). Name cannot be empty and score must be a positive number [0,100]
- [x] Indicate data entry errors
- [x] Cursor should move to the Name field when the app starts and after a name and score have been added
to the arrays
- [x] Upload to server
- [x] Should be able to navigate between fields using the enter key (requires override of def. behavior)
- [x] "Display Results" and "Display Scores" change to "Hide Results" and "Hide Scores", respectively, as appropriate