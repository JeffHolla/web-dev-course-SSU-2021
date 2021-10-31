//CountVowels

let result = CountVowels('ABRACADABRA'); 
console.log(result);

function CountVowels(text){
	return  [...text].reduce((a, b) => a + "aeouiAEOUI".includes(b), 0);
}