//BinaryWord

let result = ToBits("TestWord");
console.log(result);

function ToBits(word){
	return word.split('').map(symbol => {
		return symbol.charCodeAt(0).toString(2).padStart(8,'0');
	})
}