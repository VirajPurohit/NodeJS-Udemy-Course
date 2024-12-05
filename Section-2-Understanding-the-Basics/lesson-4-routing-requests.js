const http = require("http");
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  if (req.url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter a Message</title></head>");
    res.write(
      '<body><form method="/message" action="POST"> <input type="text" name="message"/><button type="submit">Send</button></form></body>'
    );
    return res.end();
  } else if (req.url === "/home") {
    res.write("<html>");
    res.write("<head><title> My First HTML page</title></head> ");
    res.write("<body><p> Hello World </p></body>");
    res.write("</html>");
    res.end();
  }
});

server.listen(3000);
