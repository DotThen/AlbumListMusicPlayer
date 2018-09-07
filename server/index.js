const express = require ('express');
const bodyParser = require('body-parser');
const server = express();

server.use(bodyParser.json());
server.use(express.urlencoded({extended: true}));
server.use(express.static(__dirname + '/../public'));

server.get('/', (req, res) => {
  res.send("Hello")
});

server.listen(3000, () => console.log("Listening on port 3000!"))