# Generating secure random passwords

The generatePassword function allows you to customize the password length and select the character types to be used.

### generatePassword(length, useUpperCase, useLowerCase, useNumbers, useSpecialCharacters) 
The basic function for generating a password:
   - length: The length of the generated password (default is 12).
   - useUpperCase: Whether to include uppercase letters (default is true).
   - useLowerCase: Whether to include lowercase letters (default is true).
   - useNumbers: Whether to include numbers (defaults to true).
   - useSpecialCharacters: Whether to include special characters (default is true).

### getRandomElement(array)
This function takes an array as an argument and returns a random element from it.

## Example of use:

* console.log(generatePassword(12, true, true, true, true, true)); // Mixed password
* console.log(generatePassword(16, true, true, false, false)); // Password without numbers and special characters
* console.log(generatePassword(10, false, false, true, true, true, true)); // Password with numbers and special characters only