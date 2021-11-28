//BinaryWord

function startWordToBits(){
	let word = document.getElementById('wordToBits').value;
	
	let result = ToBits(word);
	document.getElementById('wordInBits').innerHTML = result;
}

function ToBits(word){
	return word.split('').map(symbol => {
		return symbol.charCodeAt(0).toString(2).padStart(8,'0');
	})
}