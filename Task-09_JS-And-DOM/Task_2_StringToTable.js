//Task 2 String To Table

function startStringToTable(){
	let word = document.getElementById('stringWord').value;
	let height = parseInt(document.getElementById('tableHeight').value, 10);
	let width = parseInt(document.getElementById('tableWidth').value, 10);
	
	let resultFieldDOM = document.getElementById("wordInTable");
	
	if(Number.isInteger(height) == false || height <=0){
		resultFieldDOM.innerHTML = 'Введена неверная высота таблицы!';
		return;
	}

	if(Number.isInteger(width) == false || width <=0){
		resultFieldDOM.innerHTML = 'Введена неверная ширина таблицы!';
		return;
	}
	
	if (height * width < word.length)
	{
		resultFieldDOM.innerHTML = 'Места в таблице не хватит для этого слова!';
		return;
	}
	
	let result = StringToTable(height, width, word);
	resultFieldDOM.innerHTML = result;
}

function StringToTable(height, width, message) 
{
	var table = "";
	var formattedChars = 0;
	for (var i = 0; i < height; i++, formattedChars+=width) 
	{
		var letters = "";
		if (formattedChars <= message.length - 1)
		{
			letters = message.substring(formattedChars, formattedChars + width);
		}
		else
		{
			letters = " ".repeat(width);
		}
		
		var filledRow = "";
		for (var j = 0; j < letters.length; j++) 
		{
			filledRow = filledRow + ` ${letters[j]} |`;
		}
		
		plusRowString = "+" + "---+".repeat(width);
		
		table += `${plusRowString}\n|${filledRow}\n`;
	}

	plusRowString = "+" + "---+".repeat(width);	
	
	table = `${table}${plusRowString}`;
	return table;
}