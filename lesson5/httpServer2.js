const http = require("http");
const fs=require("fs");
const PORT=3000;
const send = (res, status, data, contentType = "text/plain") => {
  res.writeHead(status, { "Content-Type": contentType });
  res.end(data);
};
const server = http.createServer((req, res) => {
  const { url, method } = req;
if (method !== 'GET') {       
  return send(res, 404, 'Method Not Allowed');
}
switch (url) {
  case "/cards":
    return send(res, 200, "Welcome to cards");

  case "/checks":
    return send(
      res,
      200,
      JSON.stringify({message: "Welcome to checks" }),
      "application/json"
    );

  case "/sales":
    return send(
      res,
      200,
      `<h1>Welcome to sales</h1><p>Buy quickly before it runs out</p>`,
      "text/html"
    );

  case "/page": {
    fs.readFile("./page.html", (err, data) => {
      if (err) return send(res, 500, "Server error");
      send(res, 200, data, "text/html");
    });
    return;
  }

  case "/": {
    fs.readFile("./image.jpg", (err, data) => {
      if (err) return send(res, 500, "Server error");
      send(res, 200, data, "image/png");
    });
    return;
  }

  default:
    return send(res, 404, "404 Not Found");
}
});
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});