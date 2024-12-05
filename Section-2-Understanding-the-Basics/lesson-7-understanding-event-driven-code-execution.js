const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  res.setHeader("Content-Type", "text-html");
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Home Page</title></head>");
    res.write("<body>");
    res.write('<form action="/message" method="POST">');
    res.write('<input type="text" name="message"/>');
    res.write("<br/>");
    res.write("<button> Submit</button>");
    res.write("</form>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    /* 
      1. req.on("end", () => {
        const parsedBody = Buffer.concat(body).toString();
        const message = parsedBody.split("=")[1];
        fs.writeFileSync("message2.txt", message);
      });
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
      
      */

    /* 
      In this case, response will be sent before, the event listener for "end" is executed,
      One more thing to note is that just because response is sent, doesn't mean our registered event listener
      won't execute,
      
      If we want our response to be executed only after, file write operation is performed,
      then the code sending the response needs to be moved inside event listener as below.

      See (2)
    
    */

    /* 
      2. req.on("end", () => {
        const parsedBody = Buffer.concat(body).toString();
        const message = parsedBody.split("=")[1];
        fs.writeFileSync("message2.txt", message);
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });

      res.write("<html>");
      res.write("<head><title> My First HTML page</title></head> ");
      res.write("<body><p> Hello World </p></body>");
      res.write("</html>");
      return res.end();
       
      There is still problem with above code,  
      In above code we wish to send response after writing text to file,
      but since this code is in an event listener, it will only be executed when "end" event is fired,

      Below the event listener code, we also have lines that are sending response ,
      These lines will execute first, as the event listener code is only executed when event occurs
      And this will result in an error, as we are trying to set response after already sending it 
      
      To resolve this issue, we write return before the req.on(), this will cause the event listener to be registered and 
      execution will exit the function. See below

      */

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("message2.txt", message);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
    res.write("<html>");
    res.write("<head><title> My First HTML page</title></head> ");
    res.write("<body><p> Hello World </p></body>");
    res.write("</html>");
    return res.end();
  }
});

server.listen(3000);

/*
Event driven Code Execution

 http.createServer() and req.on() are example of patterns in Nodejs where a callback function is passed as an argument
 and the call back is executed at a later point in time (when the event occurs).
 
 This is an example of asynchronous execution.

 Nodejs has a registry of events and event listeners (event emitter registry), when an event occurs Nodejs looks through
 the registry and after firing an event, executes the callback function registered against that event


*/
