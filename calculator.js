// calculator.js


//the characters of the expression, delimited by commas
var calcExpression = new Array(); 

//the most recent input character
var newInput = ""; 

//number of open brackets in the expression so far
var numbOpenBrack = 0;

//number of closed brackets in the expression so far
var numbClosedBrack = 0;

var operators = new Array("+", "-", "*", "/");

var numbers = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 0);

//the previous input
var prev;


/*
Checks the validity of each new character ('newInput') within the growing expression
If valid, adds the new character to the calcExpression array and calls the function for screen output 
If Equals was clicked, evaluates the result and calls the function for screen output, and calls the reset function
If Clear was clicked, calls the reset function
If Back was clicked, removes the last character from the screen output and the calcExpression array
*/
function evalExpression(newInput) {
	prev = (calcExpression[calcExpression.length-1]);	

	switch (newInput) {

		case "clear":
			changeScreenOutput("");
			reset();
			break;

		case "backspace":
			if (calcExpression.length != 0) {
				if ("(".includes(String(prev))) {
					numbOpenBrack -= 1;
				}
				else { 
					if (")".includes(String(prev))) {
					numbClosedBrack -=1;
					}	
				}
				calcExpression.pop();
				changeScreenOutput((calcExpression.join('')));				
			}
			break;

		case "equals":
			if (calcExpression.length != 0) {
				evaluation = (eval(calcExpression.join('')));
				reset();
				if ((String(evaluation) === "Infinity") || (String(evaluation) === "NaN")) {
					changeScreenOutput("Oops!! You divided by zero!");	
						return;
				}
			changeScreenOutput(evaluation);	
			
			}
			break;

		case "openbracket":
			if ( numbOpenBrack != numbClosedBrack )  {
				break;
			}
			else { 
				
			
				if ((calcExpression.length === 0) || operators.includes(String(prev))) {
				
					calcExpression.push("(");
					numbOpenBrack += 1; 
					changeScreenOutput((calcExpression.join('')));	
				}
				
				break;
			}

		case "closebracket":
			if  ( ((numbOpenBrack-numbClosedBrack) !== 1) || ("(".includes(String(prev))) ) {
				//a closed bracket can be added only if there are one more open brackets in the expression
				//also it cannot come directly after an open bracket
				break;
			}
			else { 
				calcExpression.push(")");
				numbClosedBrack += 1;
				changeScreenOutput((calcExpression.join('')));	
				break;
			}			

		case "/": case "*": case "-": case "+": case ".":
			if (numbers.includes(Number(prev)) || (")".includes(String(prev))) ) {
				//an operator must follow a digit character or a closed bracket
				calcExpression.push(newInput);
				changeScreenOutput((calcExpression.join('')));	
				break;	
			}
			else {
				break;
			}

		default: //character is a number
			if (String(prev) !== ")") {
				//a digit cannot follow a closing bracket
				calcExpression.push(newInput);
				changeScreenOutput((calcExpression.join('')));	
				break;
			}
		break;
	}	
}


//Reset some of the global variables (since the expression has been cleared or evaluated)
function reset() {
	numbOpenBrack = 0;
	numbClosedBrack = 0;
	calcExpression = [];
}


function changeScreenOutput(screenOutput) {
	document.getElementById("calcoutput").innerHTML = (screenOutput);
}


function inputclick(newInput) {
	evalExpression(newInput);
	
}