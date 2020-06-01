const express = require('express');
const cors = require('cors')
// const mySQLConnection = require('./connection');

require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors());


//routes
const userRouter = require('./routes/users');
app.use("/", userRouter);


const port = process.env.PORT || 8080;

app.listen(port,() => {
    console.log(`server started on port: ${port}`);

})