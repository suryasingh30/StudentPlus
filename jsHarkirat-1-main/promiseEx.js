var d = new Promise(function(resolve){
    // setTimeout(() => {
    //     resolve("hii");
    // }, 1000);

    setTimeout(function(){
        resolve("hii")
    }, 10);
});

function calllBack(d){ // onDone
    console.log(d);
}

console.log(d);
d.then(calllBack); 


//  example
function promiseWithWithTimeout(duration){
    let p = new Promise(function(resolve){
        setTimeout(() => {
            resolve("hehe")
        }, duration);
    });
    return p;
}

async function main(){
    let value = await promiseWithWithTimeout(1000);
    console.log(value);
}

main();