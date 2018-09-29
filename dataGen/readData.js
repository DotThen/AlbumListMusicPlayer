const fs = require('fs');
const ExpressCassandra = require('express-cassandra');
const models = ExpressCassandra.createClient({
  clientOptions: {
    contactPoints: ['127.0.0.1'],
    protocolOptions: { port: 9042 },
    keyspace: 'sdc',
    
  }
});
fs.readFile('../data/data1.json', (err, data) => {
  let bleh = JSON.parse(data);
  console.log(Array.isArray(bleh), bleh.length);
});

