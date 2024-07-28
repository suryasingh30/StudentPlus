//    promise -> resolve -> resolve dekhta hai ki kis jo function promise return karwa raha hai wo uske then mai konsa function call hai, -> function.then(onDone) -> it means onDone so data of resolve(data) 
// is passed to as an input in in onDone function -> onDone(data) ..... resolve(data) passed to -> then -> ka (data) -> then(data)

// Ugly Code

const fs = require('fs');

// my own asynchronus functions
function suryaReadFile(cb){
    fs.read("a.txt", "utf-8", function(err, data){
        cb(data);
    });
}

// callback function to call
function onDone(data){
    console.log(data)
}

suryaReadFile(onDone);

// Pretty Code

// const fs = require('fs');

// my own asynchronus function
function suryaReadFile1(){
    return new Promise(function(resolve){
        fs.read("a.txt", "utf-8", function(err, data){
            resolve(data);
        });
    });
}

// call back function is call
function onDone(data){
    console.log(data);
}

suryaReadFile1().then(onDone);


