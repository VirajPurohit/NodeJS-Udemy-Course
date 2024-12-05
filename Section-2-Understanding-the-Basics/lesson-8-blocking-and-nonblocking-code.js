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

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      //fs.writeFileSync("message2.txt", message);
      /*
        fs.writeFileSync() - Blocks the execution of next line of code until file operation is done

        Better to use fs.writeFile() - Asynchronous method, does not block code execution
        */

      fs.writeFile("message3.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
      /*
       fs.writeFile() - Takes path , data to be written and third parameter, a callback which is executed after operation 
                         is completed.
                         The callback has err as parameter, which is null if operation performed successfully,
                         Note: All async functions take a callback as a parameter

     */
      /*
         Event Driven Architecture

         when an event occurs , we ask NodeJS to perform some action (create a file and write some data to it),
         NodeJS offloads the process to operating system.
         OS utilizes multithreading to perform the action
         And then uses Event loop to listen for callback.
         The code execution is never stopped/ blocked

      */
    });
    res.write("<html>");
    res.write("<head><title> My First HTML page</title></head> ");
    res.write("<body><p> Hello World </p></body>");
    res.write("</html>");
    return res.end();
  }
});

server.listen(3000);
