var haiku = require('./haiku');
var haikuFromText = require('./haikuFromText');


console.log(haiku.createHaiku([[5], [7], [5]]));
console.log(haiku.createHaiku([[3,2], [4,1,2], [2,3]]));
console.log(haiku.createHaiku(haiku.generateRandomStructure()));


haikuFromText.findHaikus([[3,2],[3,1,1,1,1],[2,1,1,1]]);
haikuFromText.findHaikus(haiku.generateRandomStructure());
