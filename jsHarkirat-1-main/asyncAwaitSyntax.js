// In fact, All three are evry similar (becomes more managable as we move to down)

// Callback Syntax

function suryaCallBack(callback){
    //  do some async function
    callback("callback");
}

async function main(){
    suryaCallBack(function callback(value){
        console.log(value);
    })
}

main();


// Promise (then) Syntax

function suryaPromise(){
    let p = new Promise(function(resolve){
        resolve("Promise");
    });
    return p;
}

function main1(){
    suryaPromise().then(function(value){
        console.log(value);
    });
}

main1();


// Async / Await Syntax

function suryaAwait(){
    let p = new Promise(function(resolve){
        resolve("Await");
    });
    return p;
}

async function main2(){
    const value = await suryaAwait();
    console.log(value);
}

main2();

  