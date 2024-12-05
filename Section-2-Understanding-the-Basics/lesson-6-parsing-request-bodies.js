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
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("message2.txt", message);
    });

    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
});

server.listen(3000);
