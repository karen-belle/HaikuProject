var fs = require("fs");
var cmudictFile = readFile('./cmudict.txt');


function readFile(file){
  return fs.readFileSync(file).toString();
}


function formatDict(data){    
   var lines = data.toString().split("\n");
   var words = [];
   lines.forEach(function(line){    
    var lineSplit = line.split("  ");    
    words.push(lineSplit);
  	});   

   var dictionary = [];

   for (var i = 0; i<words.length; i ++){
   		if(words[i][1])
   		{
			var phonemes = (words[i][1]).split(" ");
			var syllables = 0;
			for(var j = 0; j<phonemes.length; j++)
			{
				if(phonemes[j].match(/\d/))
					syllables++;
			}		   		
		 if(!dictionary[syllables])
		 	dictionary[syllables] = [];
		 
		 dictionary[syllables].push(words[i][0]);
		}	

	}

	return dictionary;
}


function createHaiku(structure){

   console.log("Structure: " + structure);


	 for(var i =0; i<structure.length; i++)
     {
     	for (var j =0; j<structure[i].length; j++)
     	{
     		var num = structure[i][j];
     		structure[i][j] = dictionary[num][Math.floor(Math.random()*(dictionary[num].length-1))];
     	}
     }

     var str = "";

     for(var i =0; i<structure.length;i++)
     {
     	for(var j = 0; j<structure[i].length; j++)
     	{
     		str += structure[i][j] + " ";
     	}
     	str+="\n";
     }

     return str;
}


function shuffle(arr)
{
  for(var i = 0; i <arr.length; i++)
  {
    var newIndex = Math.floor(Math.random()*(arr.length-1));
    var temp = arr[newIndex];
    arr[newIndex] = arr[i];
    arr[i] = temp;
  }

  return arr;
}

function generateRandomStructure()
{
  
  var line1 = shuffle(fiveCombos[Math.floor(Math.random()*fiveCombos.length)].slice());
  var line2 = shuffle(sevenCombos[Math.floor(Math.random()*fiveCombos.length)].slice());
  var line3 = shuffle(fiveCombos[Math.floor(Math.random()*fiveCombos.length)].slice());

  return [line1,line2,line3];
}

var dictionary = formatDict(cmudictFile);

var fiveCombos = [[1,1,1,1,1], [1,1,1,2], [1,1,3], [1,4], [1,2,2], [2,3], [5]]; //findCombos(5)
var sevenCombos = [[1,1,1,1,1,1,1], [1,1,1,1,1,2], [1,1,1,1,3], [1,1,1,4], [1,1,1,2,2], [1,1,5], [1,1,2,3], [1,6], [1,1,5], [1,2,4], [1,3,3], [2,5], [2,2,3], [3,4], [7]]; //findCombos(7)

module.exports = {
  createHaiku: createHaiku,
  generateRandomStructure: generateRandomStructure,
};


