const http = require('http')
// require('dotenv').config();
const getreq = require('./methouds/get-request');
const postreq = require('./methouds/post-request');
const putreq = require('./methouds/put-request');
const delreq = require('./methouds/del-request');
let movies = require('./data/movies.json')

const PORT = process.env.PORT  || 5001;

const Server = http.createServer((req,res) =>{
    req.movies = movies;
    switch(req.method){
       case 'GET':
          getreq(req,res);
          break;
        case 'POST':
           postreq(req,res);
           break;
        case 'PUT':
           putreq(req,res);
           break;
        case 'DELETE':
           delreq(req,res);
           break;
        default:
            res.statusCode=404;
            res.setHeader('Content-Type', 'application/json')
            res.write(JSON.stringify({title :'Not Fount', message :'Route Not Found'}))
            res.end();
    }
    
})

Server.listen(PORT,()=>{
console.log(`Server started on port ${PORT}`)
})