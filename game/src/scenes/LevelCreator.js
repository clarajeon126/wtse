//generate beginning crack display
var arr = Array(100).fill(0)
var level = [arr]

var x = 4

const percentOfCrack = 30
while(x < level[0].length){
    const ranNumYNCrack = Math.floor(Math.random() * (100)) + 1;
    //30% of the time a tile gets a crack
    if(ranNumYNCrack <= 15){
        const doubleWidthOrNot = Math.floor(Math.random() * (100)) + 1

        //20% of the time the crack will be double
        if(doubleWidthOrNot <= 20){
            if(doubleWidthOrNot % 2 == 0){
                level[0][x] = 3
                level[0][x+1] = 4
                level[0][x+2] = 0
                level[0][x+3] = 0
                level[0][x+4] = 0
            }
            else {
                level[0][x] = 5
                level[0][x+1] = 6
                level[0][x+2] = 0
                level[0][x+3] = 0
                level[0][x+4] = 0
            }
            x += 5
        }
        else {
            if(ranNumYNCrack % 2 == 0){
                level[0][x] = 1
                level[0][x+1] = 0
                level[0][x+2] = 0
                level[0][x+3] = 0
            }
            else {
                level[0][x] = 2
                level[0][x+1] = 0
                level[0][x+2] = 0
                level[0][x+3] = 0
            }
            x += 4
        }
    }
    else {
        x+=1
    }
}
var lineArray = [];
level.forEach(function (infoArray, index) {
    var line = infoArray.join(",");
    lineArray.push(index == 0 ? "data:text/csv;charset=utf-8," + line : line);
});
var csvContent = lineArray.join("\n");

console.log(csvContent)
console.log(level)