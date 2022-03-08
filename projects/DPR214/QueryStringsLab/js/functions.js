'use strict'

// Code attribution for this one goes to DCCC.
debugMode=true;

var $ = function(id) {
    return document.getElementById(id);
};

var joinList = function() {
    let emailAddress1 = $("email_address1").value;
    let emailAddress2 = $("email_address2").value;
    let firstName = $("first_name").value;
    let errorMessage = "";
    const emailRegex = /.+@.+/; // Emails should have some text sandwiched around an @ symbol at the very least. 
    // The only real way of validating them though is to send an email to the supplied address and have the user click a confirmation link.

    $("email_address1").className = "";
    $("email_address2").className = "";
    $("first_name").className = "";

    //
    // ENTRY VALIDATION
    //

    // Email 1 may not be blank
    if (emailAddress1 == "") {
    	errorMessage = "First email address entry required";
        focusAndMark("email_address1");
    }

    // Email 2 may not be blank
    if (emailAddress2 == "") {
    	errorMessage = "Second email address entry required";
    	focusAndMark("email_address2");
    }

    // Email 1 must match email regex
    if (!emailRegex.test(emailAddress1)) {
        errorMessage = "Invalid first email address supplied";
        focusAndMark("email_address1");
    }

    // Email 2 must match email regex
    if (!emailRegex.test(emailAddress2)) {
        errorMessage = "Invalid second email address supplied";
        focusAndMark("email_address2");
    }

    // Email 1 must match Email 2
    if (emailAddress2 != emailAddress1) {
    	errorMessage = "Email address entries must match";
        if(emailAddress2.length > emailAddress1.length)
        {
            focusAndMark("email_address2");
            focusAndMark("email_address1");
        }
        else
        {
            focusAndMark("email_address1");
            focusAndMark("email_address2");
        }
    }

    // First name may not be blank
    if (firstName == "") {
    	errorMessage = "First name entry required";
    	focusAndMark("first_name");
    }

    // submit the form if all entries are valid
    // otherwise, display an error message
    if (errorMessage == "") {
        $("email_form").submit(); 
    } else {
        $("errorbox").innerHTML = errorMessage; // Instead of using alerts, we show the user what's wrong in a textbox. Also we highlight invalid fields.
    	//alert(errorMessage);
    }
};

// Focuses the given element and marks it as invalid
function focusAndMark(id)
{
    $(id).focus();
    $(id).select();
    $(id).className = "invalid";
}

// Gets the value of the provided key. Returns null if the key has no associated value.
const getQueryStringParamValue = (paramKey) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const paramValue = urlParams.get(paramKey);

    if(paramValue != "")
    {
        debug("For URL parameter: " +paramKey +" got value: " +paramValue);
    }
    else
    {
        debug("For URL parameter: " +paramKey +" no value exists.");
    }
    
    return paramValue;
}

window.onload = function() {
    $("join_list").onclick = joinList;
    $("email_address1").focus();

    // If the user clicked "back" from the previous page, I want to populate the fields with what was previously entered.
    let mailback = getQueryStringParamValue("email_address");
    if(mailback != null)
    {
        $("email_address1").value = mailback;
        $("email_address2").value = mailback;
        $("first_name").value = getQueryStringParamValue("first_name");
    }
};