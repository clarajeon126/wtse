//generate beginning crack display

var heh = [0,0,0,0,0,0,0,1,0,0,0,0,0,2,0,0,0,1,0,0,0,0,1,0,0,0,2,0,0,0,0,0,1,0,0,0,2,0,0,0,1,0,0,0,0,2,0,0,0,1,0,0,0,1,0,0,0,2,0,0,0,1,0,0,0,0,2,0,0,0,0,0,1,0,0,0,2,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,0,3,4,0,0,0,0,1,0,0,0,0,5,6,0,0,0,0,0,0,3,4,0,0,0,1,0,0,0,0,2,0,0,0,3,4,0,0,0,0,5,6,0,0,1,0,0,0,7,8,9,0,0,0,0,0,3,4,0,0,0,0,0,5,6,0,0,0,1,0,0,0,0,0,2,0,0,0,0,7,8,9,0,0,0,1,0,0,0,5,6,0,0,0,1,0,0,0,0,0,2,0,1,0,0,0,0,7,8,9,0,0,0,1,0,2,0,0,0,0,5,6,0,0,0,2,1,0,0,0,7,8,9,0,0,0,0,0,3,4,0,0,0,1]

console.log(heh[4].length)
var lol = [Array(250).fill(0)]
var lineArray = [];
heh.forEach(function (infoArray, index) {
    var line = infoArray.join(",");
    lineArray.push(index == 0 ? "data:text/csv;charset=utf-8," + line : line);
});
var csvContent = lineArray.join(",");
console.log(csvContent)