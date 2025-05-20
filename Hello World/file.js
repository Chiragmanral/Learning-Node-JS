// import fs from 'fs';
const fs = require('fs');

// It's synchronous call to create a file
// fs.writeFileSync('./test.txt', 'Hey There!! Chirag manral synchronous\n');

// It's Asynchronous call to create a file
// fs.writeFile('./test.txt', 'Hey There!! Chirag manral Asynchronous', (err) => {});

// const result = fs.readFileSync('./contacts.txt', 'utf-8');
// console.log(result);

fs.readFile('./contacts.txt', 'utf-8', (err, result) => {
    if(err) {
        console.log('Error', err);
    }
    else {
        console.log(result);
    }
})

fs.appendFileSync("./test.txt", `${Date.now()} Hey There\n`);

// fs.cpSync('./test.txt', './copy.txt');

// fs.unlinkSync('./copy.txt');

console.log(fs.statSync("./contacts.txt").isFile());

// fs.mkdirSync('my-docs');
// fs.mkdirSync('my-documentation/a/b/c', {recursive : true});


