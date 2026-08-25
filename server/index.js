const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')

dotenv.config();

const app = express();
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log('Connected to MongoDB');
})
.catch((error)=>{
    console.log('Error connecting to MongoDB: ', error);
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log('Server is running on port: ', PORT);
});