require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { USER } = require('./userModel');

const PORT = process.env.PORT || 2100;
const MONGO_URL = process.env.MONGO_URL;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());


app.get('/', (req, res)=>{
    res.status(200).send("Server is running")
})
 app.post('/register', async(req, res)=>{
    try {
        console.log(req.body)
         const user = new USER({
                name: req.body.name,
                username: req.body.username,
                password: req.body.password

            })
            const savedUser = await user.save(user);

            res.status(200).send({
                user: { name: user.name, user: user.username, password:user.password }
            })
        
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Internal Server Error" });

    }
})


mongoose.connect(MONGO_URL).then((e) => {
    console.log("connect to mongodb")
}).catch((err) => {
    console.log("Error While Connection to MongoDB", err);
});

app.listen(PORT, () => {
    console.log("Connect to port" + PORT)
})
module.exports = app;
