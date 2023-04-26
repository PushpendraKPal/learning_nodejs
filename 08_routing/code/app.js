// REQUIRE NODE MODULES

const http = require('http');
const fs = require('fs');       // File System Module

// READING DATA FILE SYNCHRONOUSLY

const data = JSON.parse(fs.readFileSync('./Data/data.json', 'utf-8')); // Parsing JSON data into Javascript Object

// CREATING SERVER

const server = http.createServer((request, response)=>{

    let path = request.url;             // Getting url

    if(path === '/' || path.toLocaleLowerCase() === '/home')          // route according to url
    {
        response.writeHead(200, {
            "Content-Type" : "text/html"
        })
        response.end("You are in home page");
    }

    else if(path.toLocaleLowerCase() === '/about')          
    {
        response.writeHead(200, {
            "Content-Type" : "text/html"
        })
        response.end("You are in about page");
    }

    else if(path.toLocaleLowerCase() === '/contact')
    {
        response.writeHead(200, {
            "Content-Type" : "text/html"
        })
        response.end("You are in contact page");
    }

    else if(path.toLocaleLowerCase() === '/product')
    {
        response.writeHead(200, {
            "Content-Type" : "text/html"
        })
        response.end("You are in product page");
        console.log(data);
    }
    else{
    response.end("Hello World");
    console.log("new request found");
    }
})

// LISTNING THE SERVER

server.listen(5000, '127.0.0.1', ()=>{
    console.log("Server has started")
})