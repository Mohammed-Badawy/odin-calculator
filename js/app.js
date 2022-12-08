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