const express = require("express"); // importing a CommonJS module
const helmet = require("helmet");

const hubsRouter = require("./hubs/hubs-router.js");

const server = express();

function logger(req, res, next) {
  console.log(`${req.method} to ${req.originalUrl}`);
  next(); // allows the request to continure to the next middleware of route handler
}

//write a gatekeeper middleware that reads a password from the headers and if the password is 'mellon', let it continue,
// if not, send back status code 401 and a message

function gatekeeper(req, res, next) {
  console.log("at the gate");
  next();
}

server.use(helmet()); //you can use it hear for globally. Or you can use locally by using in your functions
server.use(express.json());
server.use(logger);

server.use("/api/hubs", hubsRouter);

server.get("/", (req, res) => {
  const nameInsert = req.name ? ` ${req.name}` : "";

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

server.get("/echo", (req, res) => {
  res.send(req.headers);
});

server.get("/area51", gatekeeper(), (req, res) => {
  res.send(req.headers);
});

module.exports = server;
