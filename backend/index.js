require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const productsRoutes = require('./src/routes/productRoute');
const usersRoutes = require('./src/routes/userRoute');
const brandsRoutes = require('./src/routes/brandRoute');
const ordersRoutes = require('./src/routes/orderRoute');
const offersRoutes = require('./src/routes/offerRoute');
const { execSync } = require('child_process');
const currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());
app.use('/api', productsRoutes);
app.use('/api', usersRoutes);
app.use('/api', brandsRoutes);
app.use('/api', ordersRoutes);
app.use('/api', offersRoutes);

app.get('/', (req, res) => {
    res.send("Welcome to Full API Rest Playhard E-commerce");
});

const mongodbURI = currentBranch === 'test' ? process.env.MONGODB_URI_QA : process.env.MONGODB_URI;
console.log(currentBranch);

mongoose.connect(mongodbURI)
    .then(() => console.log("-> Successfully connected to MongoDB Atlas."))
    .catch((error) => console.error(error));

app.listen(port, () => console.log("-> Server is listening on port ", port));
