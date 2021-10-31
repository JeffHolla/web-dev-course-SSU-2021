//Isograms

let result = IsAllCharsUnique("Dermatoglyphics");
console.log(result);

function IsAllCharsUnique(text){

    let chars = text.toLowerCase().split('');

    return chars.every((char_var, index) => index == chars.indexOf(char_var));
}
