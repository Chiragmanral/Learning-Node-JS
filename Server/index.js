// const http = require("node : http");
const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
    const log = `${Date.now()} : ${req.url} : New Req Received\n`;
    fs.appendFile("log.txt", log, () => {
        switch (req.url) {
            case '/' : 
                res.end("Welcome to the Homepage");
                break;

            case '/about-us' :
                res.end("I am Chirag Singh Manral");
                break;

            case '/buy-now' :
                res.end("Pay the price");
                break;

            case '/hello' :
                res.end("Hello Bro");
                break;
                
            default :
                res.end("404 Not found");
        }
    })
});

myServer.listen(8000, () => {
    console.log("Server is started successfully");
})