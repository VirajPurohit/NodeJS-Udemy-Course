const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Section 2 Assignment </title></head>");
    res.write("<body>");
    res.write("<h1> Hello World </h1>");
    res.write("<h2> Enter a Username</h2>");
    res.write("<form method='POST' action='/create-user'>");
    res.write('<label for="username"> Enter Username </label>');
    res.write('<input type = "text" name="username"/>');
    res.write("<br/>");
    res.write("<button> Submit </button>");
    res.write("</form>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  } else if (url === "/user") {
    res.write("<html>");
    res.write("<head><title>Section 2 Assignment </title></head>");
    res.write("<body>");
    res.write("<ul><li> User1</li> <li> User2 </li> <li> User3 </li> </ul>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  } else if (url === "/create-user") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const data = Buffer.concat(body).toString();
      console.log(data);
      console.log("Redirecting to home page");
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }
});

server.listen(3000);
