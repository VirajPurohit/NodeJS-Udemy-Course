const http = require("http");

/*http.createServer() takes request listener function as callback

This function is executed for every request

Request Listener function takes two arguments Request and Response

Passing request Listener is also example of event driven architecture,
where we tell Node.jS if x happens perform y, in our case if a request comes,
execute request Listener function

*/
const server = http.createServer((req, res) => {
  console.log(req);
});

/*
.listen() can be used on a server object such as one returned by http.createServer()

server.listen() cause node.js process not to immediately exit, but to listen continuously for incoming request 

Argumnets :  PORT : default : 80
             hostname : default : localhost

*/

server.listen(3000);
