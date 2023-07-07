const express = require('express');
const app = express();
const cors = require('cors');
const dbConnect = require('./dbConnect');
const userRouter = require('./routes/users');
const eventRouter = require('./routes/events');
require('dotenv').config();

//dbConnect();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.use(userRouter);
app.use(eventRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});