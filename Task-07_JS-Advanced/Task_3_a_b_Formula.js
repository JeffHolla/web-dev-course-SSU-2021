console.log(GetDegree(0))
console.log(GetDegree(1))
console.log(GetDegree(2))
console.log(GetDegree(-2))
console.log(GetDegree(3))
console.log(GetDegree(5))
console.log(GetDegree(201))
console.log(GetDegree(3.14))

function GetDegree(n) 
{
	var isNegativeDegree = false;
	
	if(Number.isInteger(n) == false || n < -200 || n > 200)
	{
		return "Invalid input";
	}
	
	var formula = "";
	if (n == 0)
	{
	    return "1";
	}
	else 
	{
		if (n < 0)
		{
			formula += "1/(";
			isNegativeDegree = true;
			n *= -1;
		}
	}
	
	for (var i = n; i >= 0; i--) 
	{
		var coefficient = Factorial(BigInt(n)) / (Factorial(BigInt(n - i)) * Factorial(BigInt(n) - BigInt(n - i)));
		if(coefficient == 1)
		{
			coefficient = "";
		}
		else	
		{
			coefficient = coefficient;
		}
		
		var variable_A = "";
		switch(i) 
		{
			case 0:
				variable_A = "";
				break;
			case 1:
				variable_A = "a";
				break;
			default:
				variable_A = `a^${i}`;
				break;
		}

		var variable_B = "";
		switch(n - i) 
		{
			case 0:
				variable_B = "";
				break;
			case 1:
				variable_B = "b";
				break;
			default:
				variable_B = `b^${n - i}`;
				break;
		}
		
		var variables = `${variable_A}${variable_B}`.toString();

		var formula =  formula + coefficient.toString() + variables + (i == 0 ? "" : "+") + (isNegativeDegree && i == 0 ? ")" : "");
	}
	return formula;
}

function Factorial(n) 
{
    return n ? n * Factorial(n - 1n) : 1n;
}