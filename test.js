const http = require("http");

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write("Working!");
  res.end();
}).listen(4000);

console.log("Server running on http://localhost:4000");
