//Task 1 Password Generator

console.log(generatePassword());

function generatePassword() {
  let numbers = "0123456789";
  let lowerLetters = "abcdefghijklmnopqrstuvwxyz";
  let upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
	const AZRegex = new RegExp('[A-Z]');
	const azRegex = new RegExp('[a-z]');
	const digitsRegex = new RegExp('[0-9]');
	
	let allChars = numbers + lowerLetters + upperLetters;
	
	let passwordLength = getRandomInt(6, 20);
	let password = "";
	
  for (var i = 0; i <= passwordLength; i++) {
      let randomIndex = getRandomInt(0, allChars.length - 1);
      password += allChars[randomIndex];
  }

  while (!digitsRegex.test(password) || !azRegex.test(password) || !AZRegex.test(password)) {
      if (!digitsRegex.test(password)) {
          console.log(`Password not contains [Digits] -> Replacing random char | Pass is [${password}]`);
          password = insertOneElement(password, numbers);
      }
      if (!azRegex.test(password)) {
          console.log(`Password not contains [a-z] -> Replacing random char | Pass is [${password}]`);
          password = insertOneElement(password, lowerLetters);
      }
      if (!AZRegex.test(password)) {
          console.log(`Password not contains [A-Z] -> Replacing random char | Pass is [${password}]`);
          password = insertOneElement(password, upperLetters);
      }
  }

  return password;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; 
}

function insertOneElement(str, elements) {
  var chars = str.split('');
  chars[getRandomInt(0, str.length - 1)] = elements[getRandomInt(0, elements.length - 1)];
  return chars.join('');
}