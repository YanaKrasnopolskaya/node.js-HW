function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generatePassword(length = 12, useUpperCase = true, useLowerCase = true, useNumbers = true, useSpecialCharacters = true) {
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let allowedChars = '';

    if (useLowerCase) {
        allowedChars += lowerCaseChars;
    }
    if (useUpperCase) {
        allowedChars += upperCaseChars;
    }
    if (useNumbers) {
        allowedChars += numberChars;
    }
    if (useSpecialCharacters) {
        allowedChars += specialChars;
    }

    if (allowedChars.length === 0) {
        throw new Error("At least one character type must be selected.");
    }

    let password = '';

    for (let i = 0; i < length; i++) {
        password += getRandomElement(allowedChars);
    }

    return password;
}

module.exports = { generatePassword };