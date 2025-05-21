// const http = require("node : http");
const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
    if(req.url === '/favicon.ico') return res.end();
    const log = `${Date.now()} : ${req.url} : New Req Received\n`;
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);
    fs.appendFile("log.txt", log, () => {
        switch (myUrl.pathname) {
            case '/' : 
                res.end("Welcome to the Homepage");
                break;

            case '/about-us' :
                const username = myUrl.query.name;
                res.end(`I am ${username}`);
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