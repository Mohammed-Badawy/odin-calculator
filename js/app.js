// Add some DOM elements references
const screen = document.querySelector(".current-value");
const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const clearBtn = document.querySelector("#clear-btn");
const deleteBtn = document.querySelector("#delete-btn");
const signBtn = document.querySelector("#sign-btn");
const percentBtn = document.querySelector("#percentage");

// add some global variables
const MAX_LENGTH = 10; // max digits on screen
let previousValue = "";
let currentValue = "";
let operator = "";


calculator();

// define calculator function
function calculator()
{
    // append number to screen
    numberBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            appendNumber(e.target.value);
        })
    })

    // delete single number 
    deleteBtn.addEventListener("click", removeNumber);


    // clear all values
    clearBtn.addEventListener("click", clearAll);

    // add sign button
    signBtn.addEventListener("click", addSign);

    // add percentage
    percentBtn.addEventListener("click", addPercentage);
}

// add percentage function
function addPercentage()
{
    if(previousValue)
    {
        let total = previousValue * (Number(currentValue) / 100);
        previousValue = total;
    }
    else
    {
        previousValue = Number(currentValue) / 100;

    }

    screen.textContent = previousValue;
}

// add sign
function addSign()
{
    if(currentValue === "0")
    {
        return;
    }
    if(currentValue[0] === "-")
    {
    currentValue = currentValue.slice(1);
    }
    else
    {
    currentValue = `-${currentValue}`;
    }

    screen.textContent = currentValue;
}

// clear all function
function clearAll()
{
    previousValue = "";
    currentValue = "0";
    operator = "";
    screen.textContent = currentValue;
}

// remove single number
function removeNumber()
{
    currentValue = currentValue.slice(0, currentValue.length -1);

    if(currentValue.length < 1)
    {
        currentValue = "0";
    }

    screen.textContent = currentValue;
}

// append number function definition
function appendNumber(num)
{
    /*
        check if the currentValue contains '.' and user input is '.'
        don't add and return
    */
    if(currentValue.includes(".") && num === ".")
    {
        return;
    }

    // allow user to max input value
    if(currentValue.length >= MAX_LENGTH)
    {
        return;
    }

    if(currentValue === "0")
    {
        currentValue = "";
    }

    currentValue += num;

    screen.textContent = currentValue;
}

// add operate function
function operate(num1, num2, oper)
{
    let sum = 0;

    if(oper === "+")
    {
        sum = add(num1, num2);
    }
    else if(oper === "-")
    {
        sum = subtract(num1, num2);
    }
    else if(oper === "×")
    {
        sum = multiply(num1, num2);
    }
    else if(oper === "÷")
    {
        sum = divide(num1, num2);
        if(sum === "Error")
        {
            return sum;
        }
        else
        {
            sum = Math.round(sum * 100) / 100; // round result to 2 decimals
        }
    }

    return sum;
}

// add some basic math functions
function add(n1, n2)
{
    return n1 + n2;
}

function subtract(n1, n2)
{
    return n1 - n2;
}

function multiply(n1, n2)
{
    return n1 * n2;
}

function divide(n1, n2)
{
    if(n2 === 0)
    {
        return "Error";
    }
    else
    {
        return n1 / n2;
    }
}