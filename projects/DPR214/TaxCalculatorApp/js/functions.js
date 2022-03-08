'use strict'

var $ = function(id) {
    return document.getElementById(id);
};

// Does tax calculation and field validation
var calculateTax = function() {
    let amount = parseFloat($("amount").value);
    let tax = parseFloat($("tax").value);
    let flag = 0;
    
    debug("Calculating tax...");
    debug("Amount: " + amount);
    debug("Tax: " + tax);
    
    // First, validate the amount. Must be >0 and a number.
    if (isNaN(amount) || amount < 0) {
        $("amount").className = "invalid"; // Change class if invalid
        setError("amount_err","Amount must be numeric and greater than zero.");
        selectAndFocus("amount");
    }
    else
    {
        $("amount").className = ""; // Otherwise, reset the style
        setError("amount_err","&nbsp");
        flag++; // Increment the flag. Calculation proceeds if flag == 2.
    }

    // Next, validate the tax. Must be a number in the range (0,100)
    if (isNaN(tax) || tax <= 0 || tax >= 100) {
        //alert(getErrorMsgTax("tax")); // No alerts!!!
        $("tax").className = "invalid";
        setError("tax_err","Tax must be numeric and between 0 and 100, exclusive.")
        selectAndFocus("tax");
    } 
    else
    {
        $("tax").className = "";
        setError("tax_err","&nbsp");
        flag++; // Flag = 2
    }
    
    // If both checks have passed, flag should equal 2
    if(flag == 2) {
        debug("The data is valid and the calculation is next.");
        $("total").value = (amount + computeTax(amount, tax)).toFixed(2); 
    }
};

// Returns the tax rate
function computeTax(amount, tax)
{
    let value = amount * tax/100;
    return value;
}

// Selects and focuses the given element
function selectAndFocus(element)
{
    $(element).select();
    $(element).focus();
}

// Sets an error message under the affected field
function setError(id,message)
{
    $(id).innerHTML = message;
}

// Clears data from all fields
function clearFields()
{
    debug("Clearing fields!");
    clearField("tax");
    clearField("amount");
    $("total").value = "";
}

// Clears data from a given field
function clearField(id)
{
    debug("Clearing field: " +id);
    $(id).className = "";
    $(id).value = "";
    $(id+"_err").innerHTML = "&nbsp";
}

// Set up button listeners
window.onload = function() {
    $("calculate").onclick = calculateTax;
    $("clear").onclick = clearFields;
    $("total").focus();
};