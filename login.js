var registerLink, loginLink, loginBtn, registerBtn, loginEmail, loginPw, registerEmail, registerPw, registerConfirmPw;

var loginValid
//var loginActive = true

registerLink = document.getElementById("registerLink")
loginLink = document.getElementById("loginLink")

loginBtn = document.getElementById("loginBtn")
registerBtn = document.getElementById("registerBtn")

loginEmail = document.getElementById("email")
loginPw = document.getElementById("password")

registerEmail = document.getElementById("regEmail")
registerPw = document.getElementById("registerPasswordField")
registerConfirmPw = document.getElementById("confirmPasswordField")

var found

//TO GO TO THE REGISTRATION/LOGIN PAGES
//to redirect to the registration page
registerLink.addEventListener ("click", () => {
    //loginActive = false;
    document.getElementById("loginErrMsg").innerHTML = ""
    document.getElementById("registerErrMsg").innerHTML = ""
    document.getElementById("register").style.display ="flex"
    document.getElementById("login").style.display ="none"
})

//redirect to the login page
loginLink.addEventListener ("click", () => 
{
    //loginActive = true;
    document.getElementById("loginErrMsg").innerHTML = ""
    document.getElementById("registerErrMsg").innerHTML = ""
    document.getElementById("register").style.display ="none"
    document.getElementById("login").style.display ="flex"
})

//LOGIN PAGE FUNCTIONS

//show the error message "Please enter a valid HKU @connect email address" when the input field is out of focus
//if the email is valid, check if it exists
loginEmail.addEventListener("blur", (event) => {
    
    event.preventDefault()
    
    let str = "@connect.hku.hk" 
    let end = loginEmail.value.substring(loginEmail.value.length - 15)

    if (str != end)
    {   
        loginValid = false
        document.getElementById("loginErrMsg").innerHTML = "Please enter a valid HKU @connect email address"
    }
    else
    {   
        loginValid = true
        //if the email is valid, send a get request to check.php to check if the email record exists
        fetch(`check.php?email=${loginEmail.value}`, {method: "GET"})
        .then(response => response.json())
        .then(data =>
        {
            if (data.found)
            {
                found = true
                document.getElementById("loginErrMsg").innerHTML = "";
            }
            else
            {   
                found = false
                document.getElementById("loginErrMsg").innerHTML = "Cannot find your email record";
            }
        })
}})

//when the login button is clicked
loginBtn.addEventListener("click", (e) =>
{   

    if (loginEmail.value == "")
    {   
        e.preventDefault()
        document.getElementById("loginErrMsg").innerHTML = "Missing email address"
    }
    else if (loginValid == false)
    {
        e.preventDefault()
        document.getElementById("loginErrMsg").innerHTML = "Please enter a valid HKU @connect email address"
    }
    else if (loginPw.value == "")
    {
        e.preventDefault()
        document.getElementById("loginErrMsg").innerHTML = "Please provide your password"
    }
    else if (found == false)
    {
        document.getElementById("loginErrMsg").innerHTML = "Cannot find your email record";
        //login();
    }
    else
    {
        document.getElementById("loginErrMsg").innerHTML = ""
        //login();
    }
})

//REGISTRATION PAGE FUNCTIONS

registerEmail.addEventListener("blur", (event) =>
{
    event.preventDefault()

    if(registerEmail.value.substring( registerEmail.value.length - 15) != "@connect.hku.hk")
    {
        document.getElementById("registerErrMsg").innerHTML = "Please enter a valid HKU @connect email address"
    }

    else
    {
        //check if the email already exists
        fetch(`check.php?email=${registerEmail.value}`, {method: "GET"})
        .then(response => response.json())
        .then(data =>
        {
            if (data.found)
            {
                //exists = true
                document.getElementById("registerErrMsg").innerHTML = "This email address is already registered";
            }
            else
            {   
                //exists = false
                document.getElementById("registerErrMsg").innerHTML = "";
            }
        })
    }
})

registerBtn.addEventListener("click", (event) =>
{
    //check if all the fields are filled

    if (registerEmail.value == "" || registerPw.value == "" || registerConfirmPw.value == "")
    {
        event.preventDefault()
        alert("Please fill in all the fields")
    }
    else if (registerEmail.value.substring(registerEmail.value.length - 15) != "@connect.hku.hk")
    {
        event.preventDefault()
        document.getElementById("registerErrMsg").innerHTML = "Please enter a valid HKU @connect email address"
    }
    else if  (registerPw.value != registerConfirmPw.value)
    {   
        event.preventDefault()
        document.getElementById("registerErrMsg").innerHTML = "Password Mismatch!"
    }
    else
    {
        document.getElementById("registerErrMsg").innerHTML = ""

    }
})
