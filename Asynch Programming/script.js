//Asynch Programming

//setTimeout(callback, delay)

// function stepOne(callback){
//     setTimeout(() => {
//     console.log("Step 1: Jump");
//     callback();
//     }, 2000);
// }

// function stepTwo(callback){
//     setTimeout(() => {
//     console.log("Step 2: Reload");
//     callback();
//     }, 2000);
// }

// function stepThree(callback){
//     setTimeout(() => {
//     console.log("Step 3: Reinforce");
//     callback();
//     }, 2000);
// }

// function stepFour(callback){
//     setTimeout(() => {
//     console.log("Step 4: Return");
//     callback();
//     }, 2000);
// }

// function stepFive(callback){
//     setTimeout(() => {
//     console.log("Step 5: Replace");
//     callback();
//     }, 2000);
// }

// stepOne(() => {
//     stepTwo(() => {
//         stepThree(() => {
//             stepFour(() => {
//                 stepFive(() => {});
//             });
//         });
//     });
// });

// setTimeout(x, 2000); // callback function: any function passed to another function

// function x(){
//     console.log("Hello");
// }

// const y = () => {
//     console.log("Hello");
// }

// const showMessage = (callback) => {
//     console.log(callback);
// }

// const first = (callback) => {
//     setTimeout(() => {
//         showMessage("Hello");
//         callback();
//     }, 2000);
// }

// const second = (callback) => {
//     showMessage("World!");
// }

// first(second);

//Promise - object that stores the future value of an asynchronous operation
// > pending
// > fulfilled
// > rejected

// const promise = new Promise(callback)

// const promise = new Promise ((resolve, reject) => {
//     // const state = true; //pending
//     // if(state){
//     //     resolve("Promise is fulfilled");
//     // } else {
//     //     reject("Promise is rejected");
//     // }
    
// });

// .then() and .catch()

// const promise = new Promise ((resolve, reject) => {
//     const randomNum = Math.floor(Math.random() * 10);
//     setTimeout(() => {
//         if(randomNum < 4){
//             resolve("Yes")
//         } else {
//             reject("No")
//         }
//     }, 1000);
// });

// promise
// .then((value) => {
//     console.log(value);
// })
// .catch((error) => {
//     console.log(error);
// });

// const promise = new Promise((resolve) => {
//     resolve("Step 1: Jump");
// });

// const promise2 = new Promise((resolve, reject) => {
//     resolve("Step 2: Reload");
// });

// const promise3 = new Promise((resolve) => {
//     reject("Step 3: Failed to follow");
// });

// // .then() and .catch()
// promise
// .then((value) => {
//     console.log(value)
//     return promise2;
// })
// .then((value) => {
//     console.log(value)
//     return promise3;
// })
// .catch((error) => {
//     console.log(error);
// });

// mew Peomise(callback)
//async await

function promise1(){
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Step 1: Jump");
            resolve("Data from step 1");
        }, 1000);
    });
}

function promise2(callback){
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Step 2: Hop");
            resolve(callback + "-> Data from step 2");
        }, 1000);
    });
}

async function runSteps(){
    const result1 = await promise1();
    const result2 = await promise2(result1);
    console.log(result2);
}

runSteps();

