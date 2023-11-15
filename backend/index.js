const express = require('express');
const createMongoDBServer = require('./src/serverBDMongo');

const app = express();

/** MongoDB Server Implementation */
createMongoDBServer(app);

app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`);
});
