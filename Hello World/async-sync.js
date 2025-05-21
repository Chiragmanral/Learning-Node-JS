const fs = require('fs');
const os = require('os');

console.log(os.cpus().length); //gives the no.of cores of cpu

// console.log("1");
// // Synchronous task -> blocking code -> In main thread
// const result = fs.readFileSync('./contacts.txt', 'utf-8');
// console.log(result);

// console.log("2");

console.log("1");
// Asynchronous task -> non-blocking code -> Carry a different thread from thread pool
fs.readFile('./contacts.txt', 'utf-8', (err, result) => {
    console.log(result);
}); 

console.log("2");
console.log("3");
console.log("4");