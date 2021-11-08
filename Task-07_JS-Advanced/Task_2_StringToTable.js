console.log(StringToTable(4, 4, "Hello World!"))
console.log(StringToTable(4, 3, "Nice pattern"))
console.log(StringToTable(3, 4, "Nice pattern"))

function StringToTable(m, n, message) 
{
	if (Number.isInteger(n) == false || Number.isInteger(m) == false)
	{
		return "Invalid input";
	}

	if (m <= 0 || n <= 0)
	{
		return "Invalid input";
	}
	
	if (m * n < message.length)
	{
		return "Invalid input";
	}	

	var table = "";
	var formattedChars = 0;
	for (var i = 0; i < m; i++, formattedChars+=n) 
	{
		var letters = "";
		if (formattedChars <= message.length - 1)
		{
			letters = message.substring(formattedChars, formattedChars + n);
		}
		else
		{
			letters = " ".repeat(n);
		}
		
		var filledRow = "";
		for (var j = 0; j < letters.length; j++) 
		{
			filledRow = filledRow + ` ${letters[j]} |`;
		}
		
		plusRowString = "+" + "---+".repeat(n);
		
		table += `${plusRowString}\n|${filledRow}\n`;
	}

	plusRowString = "+" + "---+".repeat(n);	
	
	table = `${table}${plusRowString}`;
	return table;
}