require('newrelic');
const cluster = require('cluster');
const os = require('os');
const server = require('./server.js');

if (cluster.isMaster) {
  const cpuCount = os.cpus().length;
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }
} else { 
  server.listen(3001, () => console.log("Listening on port 3001!"));
}

cluster.on('exit', (worker) => {
  console.log('Hey my guy worker ' + worker.id + ' just clocked out');
  cluster.fork;
});