// Add some DOM elements references
const screen = document.querySelector(".current-value");
const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const clearBtn = document.querySelector("#clear-btn");
const deleteBtn = document.querySelector("#delete-btn");
const signBtn = document.querySelector("#sign-btn");
const percentBtn = document.querySelector("#percentage");
const equalBtn = document.querySelector("#equal-btn");

// add some global variables
const MAX_LENGTH = 15; // max digits on screen
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

    // operators buttons functionality
    operatorBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
        triggerOperation(e.target.value);
        })
    })

    // add equal button functionality
    equalBtn.addEventListener("click", () => {
        let total = operate(previousValue, Number(currentValue), operator);
        clearAll();
        screen.textContent = total.toString();
    })

    // add keyboard functionality
    window.addEventListener("keydown", (e) => {
        const NUMS = "1234567890.";
        const OPERATORS = "-+/*";
        const EQUAL = ["Enter", "="];
        const BACKSPACE = "Backspace";
        const CLS = "Escape";
        const PERCENT = "%";

        if(NUMS.includes(e.key))
        {
            appendNumber(e.key);
        }
        else if(OPERATORS.includes(e.key))
        {
            triggerOperation(e.key);
        }
        else if(PERCENT.includes(e.key))
        {
            addPercentage();
        }
        else if(e.key === BACKSPACE)
        {
            removeNumber();
        }
        else if(e.key === CLS)
        {
            clearAll();
        }
        else if(EQUAL.includes(e.key))
        {
            if(currentValue === "0" && previousValue === ""){
                return;
            }
            let total = operate(previousValue, Number(currentValue), operator);
            clearAll();
            screen.textContent = total;
        }
        else
        {
            e.preventDefault();
        }
    })
}

// trigger operation
function triggerOperation(op)
{
    if(screen.textContent === "Error")
    {
        clearAll();
        return;
    }

    if(screen.textContent !== "0")
    {
        currentValue = screen.textContent;
    }
        
    if(!previousValue){
        previousValue = Number(currentValue);
        currentValue = "0";
    }
    else
    {
        let total = operate(previousValue, Number(currentValue), operator);
        previousValue = total;
        screen.textContent = previousValue;
        currentValue = "0";
    }
    operator = op;
}

// add percentage function
function addPercentage()
{
    if(previousValue)
    {
        let total = previousValue * (Number(currentValue) / 100);
        previousValue = Math.round(total * 100) / 100;

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
    else if(oper === "×" || oper === "*")
    {
        sum = multiply(num1, num2);
    }
    else if(oper === "÷" || oper === "/")
    {
        sum = divide(num1, num2);
        if(sum === "Error")
        {
            return sum;
        }
    }
    sum = Math.round(sum * 100) / 100; // round result to 2 decimals
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