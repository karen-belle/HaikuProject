
var haiku = require('./haiku');
var fs = require("fs");
var cmudictFile = readFile('./cmudict.txt');
var book = './PrideandPrejudice.txt'; //can't figure out how to change book with module


function readFile(file){
  return fs.readFileSync(file).toString();
}


function formatObjDict(data){    
   var lines = data.toString().split("\n");
   var words = [];
   lines.forEach(function(line){    
    var lineSplit = line.split("  ");    
    words.push(lineSplit);
  	});   

   var dictionary = {};

   for (var i = 0; i<words.length; i ++)
   {
   		if(words[i][1])
   		{
			var phonemes = (words[i][1]).split(" ");
			var syllables = 0;
			for(var j = 0; j<phonemes.length; j++)
			 {
				if(phonemes[j].match(/\d/))
					syllables++;
			 }		   		
      
      dictionary[words[i][0]] = syllables;		 

		  }	

	}

	return dictionary;
}


function formatBook(book)
{
    var book = readFile(book);
    var words = book.toString().split(/\W+/);

    return words;
}
 
function createSyllableArray(arr){   
    
    var syllables  = arr.slice();

    for(var i =0; i < arr.length; i++)
    {
      syllables[i] = dictObj[arr[i].toUpperCase()];
    }  

    return syllables;

}

function findHaikus(structure)
{
  var numSyb = structure.join().split(",");

  var indexArr = [];

  for(var i = 0; i <syllablesArray.length - numSyb.length; i++)
  {
    var newArray = syllablesArray.slice(i, numSyb.length+i);

    if(newArray.join() == numSyb.join())
      indexArr.push(i);

  }

   compileHaiku(structure, numSyb, indexArr);


}

function compileHaiku(structure, numSyb, indexArray)
{
  var haikus = [];
  
  for(var i =0; i <indexArray.length; i++)
  {
    var str = "";
    for(var j = 0; j <numSyb.length; j++)
    {
      str += wordArray[indexArray[i] + j];

      if(j == structure[0].length-1 | j == structure[0].length + structure[1].length -1)
        str+= '\n'
      else
        str+=" "
    }

    haikus.push(str);
  }
  printHaikus(structure, haikus);
}

function printHaikus(structure, haikuArray)
{
  if(haikuArray.length > 1){
    console.log("All haikus in text with the structure " + structure);
    for(var i =0; i<haikuArray.length; i ++)
    {
      console.log(haikuArray[i] + "\n");
    }
  }
  else
  {
    console.log("There are no haikus in the text with the structure " + structure);
  }

}

var dictObj = formatObjDict(cmudictFile);
var wordArray = formatBook(book);
var syllablesArray = createSyllableArray(wordArray);


module.exports ={
  findHaikus:findHaikus,
}

