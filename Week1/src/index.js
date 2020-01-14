const http = require('http');
const data = require('../public/todo.json')
const fs = require('fs')
const path = require('path')

//create a server object:
const todo =  (req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(data))
    res.end(data.json); //end the response
}

const indexPage = (req, res) => {
    fs.readFile(path.join(__dirname, '../public/index.html'), (err, data) =>{
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(data)
        res.end()
    }) 
}

const readPage = (req, res) => {
    fs.readFile(path.join(__dirname, '../public/read-todo.html'), (err, data) =>{
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(data)
        res.end()
    }) 
}

const fakePage = (req, res) => {
    /* Send the HTTP header
    * HTTP Status: 301 : Moved Permanently
    * Location:'http://' +  'The host of the requested location' + the path to the page that you want to be redirected to.
    */
    res.writeHead(301, {'Location': "http://" + req.headers['host'] + '/index' });
    res.end()
}

const app = http.createServer( (req, res) => {
    switch(req.url){
        case "/todo":
            todo(req, res)
            break;

        case "/index":
            indexPage(req, res)
            break;

        case "/read-todo":
            readPage(req, res)
            break;

        default:
            fakePage(req, res)
            break;

    }
})

app.listen(3000)
console.log('Server listening on port 3000')
