// let a = 5;
// let b = 3;
// // for (let i = 0; i < a; i++) {
// //     console.log(i);
// // }

// function calArithmetic(a, b, arithmeticFunction){
    
//     const ans = arithmeticFunction(a, b)
//         return ans;

// }

// function calArithmetic1(a, b, type){

//     if(type == "sum")
//         return sum(a, b);

//     if(type == "sub")
//         return sub(a, b);

// }

// function sum(a, b){
//     return a+b;
// }

// function sun(a, b){
//     return a-b;
// }

// let value = calArithmetic(a, b, sum);

// value = calArithmetic1(a, b, "sum");

// console.log(value);

// const user = {
//     name : "surya",
//     gender : "male"
// }

// let final = user;
// console.log(final)

// final = JSON.stringify(user)
// console.log(final)

// class Animal{
//     constructor(name, speak, legCount){
//         this.name = name;
//         this.speak = speak;
//         this.legCount = legCount;
//     }

//     speaks(){
//         console.log("hii there " + this.speak);
//     }  
// }  

// let dog = new Animal("dog", "bark", 4);
// dog.speaks(); 



const sum = (a, b) => {
    return a+b;
}

sum(2, 3);

console.log(sum);