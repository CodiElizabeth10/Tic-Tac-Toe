//this variable keeps track of whose turn it is.
let activePlayer = 'X';

//this array stores and array of moves we use this to determine win conditions
let selectedSquares =[];

//this function is for placing an x or o in a square
function placeXOrO(squareNumber)  {
    //this condition ensures a square hasn't been selected already.
    //the .some() method is used to check each element of selectedSquare array
    //to see if it contains the square number clicked on
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        //this variable retrieves the html elem id that was clicked
        let select = document.getElementById(squareNumber);
        //this condition checks whos turn it is
        if (activePlayer === 'X') {
        //if active player is equal to 'X', the x.png is placed in HTML
        select.style.backgroundImage = 'url("./images/x.png")';
        //active player may only be 'X' or 'O' so if not x it must be o
    } else {
        //if activePlayer is equal to o the o.png is placed in html
        select.style.backgroundImage = 'url("./images/o.png")';
    }
        //squareNumber and activePlayer are concatened together and added to array
    selectedSquares.push(squareNumber + activePlayer);
    //This calls a function to check for any win conditions.
    checkWinConditions();
    //This condition is for changing the active player.
    if (activePlayer === 'X') {
        //if active plater is X change it to O
        activePlayer = 'O';
       //If active player is anything other than 'X'.
    } else {
        //change the active player to x
        activePlayer = 'X';
    }



//This function plays placement sound.
audio('./media/place/mp3');
//this condition checks to see if it is computers turn.
if(activePlayer === 'O'){
//this function disables clicking for computer choice.
disableClick() ;
//this functin waits 1 second before computer places image and enables click
setTimeout(function() {computersTurn() ; }, 1000)
}
 //returning true is needed for computersTurn() function to work.
 return true;
}
//This function results in a random square being selected.
function computersTurn() {
    //This boolean is needed for our while loop.
    let success = false;
    //this variable stores a random number 0-8.
    let pickASquare;
    //This conditon allows our while loop to keep trying if a square is selected already
    while(!success) {
        //A random number between 0 and 8 is selected.
        pickASquare = String(Math.floor(Math.random() * 9));
        //If the random number evaluated returns true, the square hasn't been selected yet.
        if (placeXOrO(pickASquare)) {
            //this line calls the function
            placeXOrO(pickASquare);
            //this changes our boolean and ends the loop.
            success = true;
        };

        }
    }
}
//This function parses the selectedSquares array to searcg for win conditions
//drawWinLine function is called to draw line if condition is met.
function checkWinConditions() {
    //X 0, 1, 2 condition.
    if    (arrayIncludes('0X', '1X', '2X')) { drawWinLine (50, 100, 558, 100) }
    // X 3, 4, 5 condition
    else if (arrayIncludes('3X', '4X', '5X')) { drawWinLine (50, 304, 558, 304) }
        // X 6, 7, 8 condition
        else if (arrayIncludes('6X', '7X', '8X')) { drawWinLine (50, 508, 558, 508) }
            // X 0, 3, 6 condition
    else if (arrayIncludes('0X', '3X', '6X')) { drawWinLine (100, 50, 100, 558) }
        // X 1, 4, 7 condition
        else if (arrayIncludes('1X', '4X', '7X')) { drawWinLine (304, 50, 304, 558) }
            // X 2, 5, 8 condition
    else if (arrayIncludes('2X', '5X', '8X')) { drawWinLine (508, 50, 508, 558) }
        // X 6, 4, 2 condition
        else if (arrayIncludes('6X', '4X', '2X')) { drawWinLine (100, 508, 510, 90) }
            // X 0, 4, 8 condition
    else if (arrayIncludes('0X', '4X', '8X')) { drawWinLine (100, 100, 520, 520) }
        // O 0, 1, 2 condtion
        else if (arrayIncludes('0O', '1O', '2O')) { drawWinLine (50, 100, 558, 100) }
            // O 3, 4, 5 condition
    else if (arrayIncludes('3O', '4O', '5O')) { drawWinLine (50, 304, 558, 304) }
        // O 6, 7, 8 condtion
        else if (arrayIncludes('6O', '7O', '8O')) { drawWinLine (50, 508, 558, 508) }
            // O 0, 3, 6 condition
    else if (arrayIncludes('0O', '3O', '6O')) { drawWinLine (100, 50, 100, 558) }
        //O 1, 4, 7 condition
    else if (arrayIncludes('1O', '4O', '7O' )) { drawWininLine (304, 50, 304, 558) }
     //O 2, 5, 8 condition
     else if (arrayIncludes('2O', '5O', '8O' )) { drawWininLine (508, 50, 508, 558) }
      //O 6, 4, 2 condition
    else if (arrayIncludes('6O', '4O', '2O' )) { drawWininLine (100, 508, 510, 90) }
     //O 0, 4, 8 condition
     else if (arrayIncludes('0O', '4O', '8O' )) { drawWininLine (100, 100, 520, 520) }
     //This conditon checks for tie. If none of the above conditions register and 9
     //sqaures are selected the code executes.
     else if (selectedSquares.length >= 9) {
         //This function plays the tie game sound.
         audio('/media/tie.mp3"');
         //This function sets a .3 second timer before the resetGame is called.
         setTimeout(function () { resetGame(); }, 1000);
     
}

//This function checks an array includes 3 strings. It is used to check for
//each win condtion.
function arrayIncludes(squareA, squareB, squareC)  {
    //these 3 variables will be used to check for 3 in a row.
    const a = selectedSquares.includes(squareA)
    const b = selectedSquares.includes(squareB)
    const c = selectedSquares.includes(squareC)
// If the 3 variables we pass are all included in our array true is
//returned and our else if condition executes the drawWinLine function.
if (a === true && b === true && c === true) { return true }
  }
}