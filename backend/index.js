const express = require('express');
const configureAppImplementingMongoDBServer = require('./src/serverBDMongo');
const configureAppImplementingStrypeServer = require('./src/serverStripe');
const configureEmailServer = require('./src/serverEmail');


const app = express();

/** MongoDB Server Implementation */
configureAppImplementingMongoDBServer(app);

/** Stripe Server Implementation */
configureAppImplementingStrypeServer(app);

configureEmailServer(app);

app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`);
});
