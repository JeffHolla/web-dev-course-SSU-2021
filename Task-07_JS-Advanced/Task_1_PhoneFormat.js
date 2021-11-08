console.log(FormatPhone([9, 0, 0, 1, 1, 1, 2, 2, 3, 3]))
console.log(FormatPhone([9, 2, 7, 5, 5, 5, 6, 6, 9, 0]))
console.log(FormatPhone([1, 2, 3, 4, 5, 6, 7, 8, 9, -11]))
console.log(FormatPhone([]))
console.log(FormatPhone("aw93fha="))

function FormatPhone(numbers) 
{
	if (numbers.length != 10 || Array.isArray(numbers) == false)
	{
		return "Invalid input";
	}

    	for (var i = 0; i < numbers.length; i++) 
	{
        	if (typeof numbers[i] != "number" || numbers[i] < 0 || numbers[i] > 9 || !Number.isInteger(numbers[i])) 
		{
         	   	return "Invalid input";
		}
        }

	var numbersStr = numbers.join('')
	return "+7 (" + numbersStr.slice(0,3) + ") " + numbersStr.slice(3,6) + "-" + numbersStr.slice(6,8) + "-" + numbersStr.slice(8,10)
}
