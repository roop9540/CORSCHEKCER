require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { USER } = require('./userModel');

const PORT = process.env.PORT || 2100;
const MONGO_URL = process.env.MONGO_URL;
const app = express();
app.use(cors());
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x - client - key, x - client - token, x - client - secret, Authorization");
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
    res.status(200).send("Server is running")
})
app.post('/register', async (req, res) => {
    try {
        console.log(req.body)
        const user = new USER({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password

        })
        const savedUser = await user.save(user);

        res.status(200).send({
            user: { name: user.name, user: user.username, password: user.password }
        })

    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Internal Server Error" });

    }
})

app.get('/check', (req, res)=>{
    let {name, message} = req.query;
    console.log({name, message});
    res.status(200).json({name, message});
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
