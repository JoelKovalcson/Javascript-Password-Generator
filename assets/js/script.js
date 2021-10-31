// Assignment code here

// Special Character String (Space not included since it frequently isn't supported)
var specialCharacters = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

// Password Object
var passwordParameters = {
  lowercase: false,
  uppercase: false,
  numeric: false,
  special: false,
  length: 8,
  password: ""
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function generatePassword() {
  // Get password parameters from user
  let validParameters = getPasswordParameters();
  // If any parameter check fails, return previous password so display isn't changed
  if(!validParameters) return passwordParameters.password;
  
  // Setup array of valid parameters chosen
  let parameterArr = [];
  if(passwordParameters.lowercase) parameterArr.push("lowercase");
  if(passwordParameters.uppercase) parameterArr.push("uppercase");
  if(passwordParameters.numeric) parameterArr.push("numeric");
  if(passwordParameters.special) parameterArr.push("special");
  
  // If no parameters were chose, do nothing
  if(parameterArr.length == 0) return passwordParameters.password;

  // Everything so far is valid, clear previous password
  passwordParameters.password = "";

  // Declare variables to reserve memory
  let char;
  let type;

  // Generate as many characters as the user requested
  for(let i = 0; i < passwordParameters.length; i++) {
    // Get type of character to generate
    type = parameterArr[getRandomInt(parameterArr.length)];

    switch (type) {
      // 97 is starting ascii value of 'a'
      case "lowercase":
        char = String.fromCharCode(97 + getRandomInt(26));
        break;
      // 65 is starting ascii value of 'A'
      case "uppercase":
        char = String.fromCharCode(65 + getRandomInt(26));
        break;
      // Can just use the random number
      case "numeric":
        char = getRandomInt(10);
        break;
      // Could do more complicated ascii value management here, or just randomly index the special character array
      case "special":
        char = specialCharacters[getRandomInt(specialCharacters.length)];
        break;
      // Should never happen
      default:
        char = null;
    }
    passwordParameters.password += char;
  }

  return passwordParameters.password;
}

function getPasswordParameters() {
  // window.alert
  // window.confirm
  // window.prompt
  let invalidResponse = true;

  while(invalidResponse) {
    // Get the length of the password from the user. Use the last stored length as default or 8 if first time.
    let response = window.prompt("Please enter the number of characters (8-128) for your password:", passwordParameters.length);
    // If canceled, exit
    if(response === null) return false;
    // Check if value can be interpreted as a number between valid ranges
    if(!isNaN(response) && response <= 128 && response >= 8) {
      passwordParameters.length = response;
      // Exit loop if response is valid
      invalidResponse = false;
    }
    else {
      window.alert("Please enter a valid number between 8-128!");
    }
  }

  // Check if user wants lowercase
  response = window.confirm("Would you like to include lowercase letters?\na-z");
  if(response) passwordParameters.lowercase = true;
  else passwordParameters.lowercase = false;

  // Check if user wants uppercase
  response = window.confirm("Would you like to include uppercase letters?\nA-Z");
  if(response) passwordParameters.uppercase = true;
  else passwordParameters.uppercase = false;

  // Check if user wants numeric
  response = window.confirm("Would you like to include numerical values?\n0-9");
  if(response) passwordParameters.numeric = true;
  else passwordParameters.numeric = false;

  // Check if user wants special
  response = window.confirm("Would you like to include special characters?\n" + specialCharacters);
  if(response) passwordParameters.special = true;
  else passwordParameters.special = false;

  return true;
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
