const express = require('express');
const app = express();
const cors = require('cors');

const userRouter = require('./routes/users');
const organisationRouter = require('./routes/organisation');
const eventRouter = require('./routes/events');
const ticketRouter = require('./routes/ticket');
require('dotenv').config();

app.use(cors({
    credentials: true,
    origin: ['https://ems-two-orcin.vercel.app',process.env.CLIENT_URL]
}));
app.use(express.json());

const port = process.env.PORT || 5000;

app.use(userRouter);
app.use(eventRouter);
app.use(organisationRouter);
app.use(ticketRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});