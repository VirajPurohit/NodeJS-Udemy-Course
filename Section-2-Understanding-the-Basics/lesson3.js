/* Understanding Response Object*/

const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  res.setHeader("Content-Type", "text/html"); // Type of content of response will be HTML

  /*
  res.write() - allows us to write data to response and it does it in chunks (multiple lines) 
  
  */
  res.write("<html>");
  res.write("<head><title> My First HTML page</title></head> ");
  res.write("<body><p> Hello World </p></body>");
  res.write("</html>");
  res.end(); //Signals we are done writing to response object and we should not write to it anymore
});

server.listen(3000);
