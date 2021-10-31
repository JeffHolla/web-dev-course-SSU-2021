//FlatArray 

let result = flatToOne([[21,214,-1],[5], []);
console.log();

function flatToOne(arrays){
	let result = [];
    for (const item of arrays) {
    	result.push(...item);
    }
    return result.sort();
}