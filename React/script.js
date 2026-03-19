// // spread operator

// const numbers = [1, 2, 3, 4, 5]
// let maximum = Math.max(...numbers) // Math.max(1, 2, 3, 4, 5)

// console.log(maximum)

// let minimum = Math.min(...numbers) // Math.min(1, 2, 3, 4, 5)

// console.log(minimum)

// const name = 'Alejandro'

// const letters = [...name] // ['A', 'l', 'e', 'j', 'a', 'n', 'd', 'r', 'o']
// console.log(letters)

// let fruits = ['apple', 'orange', 'banana']
// let vegetables = ['ampalaya', 'malunggay', 'upo']
// let foods = [...fruits, ...vegetables, 'eggs', 'milk']

// console.log(foods)

// // destructuring
// // array [] and obj {}

// let a = 1;
// let b = 2;

// [a, b] = [b, a] // left side is array destructuring, right side is array (assigning right to left; a, b = [2, 1])
// console.log(a)
// console.log(b)

// let fruits = ['orange', 'apple', 'lemon', 'kiwi'];

// [fruits[0], fruits[3]] = [fruits[3], fruits[0]];

// console.log(fruits);

// const colors = ['red', 'green', 'blue', 'yellow', 'orange'];

// const [x, y, z, ...extra] = colors; // x = 'red', y = 'green', z = 'blue'

// console.log(extra);

// const person1 = {
//     name: 'Alejandro',
//     age: 30,
//     city: 'New York'
// }

// const person2 = {
//     name: 'Samantha',
//     age: 33,
//     city: 'Manila',
//     job: 'Police'
// }

// // const {name, age, city = "Davao", job = 'Unemployed'} = person2;

// // console.log(job);

// function display({name, age, city, job = 'Unemployed'}) {
//     console.log(`Name: ${name}, Age: ${age}, City: ${city}`);
//     console.log(`Job: ${job}`);
// }

// display(person1)

// Short-circuiting
// Logical && Operator
// && left to right
// const x = value1 && value2
// if value1 is falsy, it stops and returns value1
// x = value1
// if value1 is truthy, it returns value2
// x = value2

// const user = {
//     profile: {
//         name: 'Alejandro',
//     }
// }

// let name = user.profile && user.profile.name

// console.log(name);

// const settings  = {
//     theme: '',
// }

// const theme = settings && settings.theme && 'Theme is set!';

// console.log(theme)

//Optional Chaining (?.)

// const user = {
//     name: 'Alejandro',
//     address: {
//         street: 'Roxas',
//         city: 'Davao',  
//         contact: {
//             phone: '09090909',
            
//         }
//     }
// }

// // nullish coalescing (??)
// const email = user?.address?.contact?.email ?? 'hello';

// console.log(email)

const game = {
    startingCoins: 0,
}

const character = {
    coins: game.startingCoins ?? 1000, // if game.startingCoins is null or undefined, it will use 1000
}

console.log(character)