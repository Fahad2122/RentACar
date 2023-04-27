const User = require("../models/User");
const connectTOMySQL = require('../db');
const express = require('express');
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

//create new table method get route=/createUserTable
router.get("/createUserTable", (req, res) => {
    connectTOMySQL.query(User, (err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.send('Table created');
    })
})

//create new user method post
router.post("/signup",[
    body("FirstName", "Enter a valid name").isLength({min: 3}),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({min: 5})
], async(req, res) => {

    let success = false;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const age = req.body.age;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;
    const password = req.body.password;

    //check whether user already exits
    let user = "select email from users where email=?";
    connectTOMySQL.query(user, [email], (err, result) => {
        if(err){
            return res.status(500).json({error: "internal server error"});
        }
        if(result!=''){
            return res.status(400).json({ error: "email already exits"});
        }

        //sceure password using bcryptjs
        // const salt = bcrypt.genSaltSync(10);
        const securePass = bcrypt.hashSync(password);

        let sql = "INSERT INTO users (FirstName, LastName, age, email, phone, address, password) VALUES (?, ?, ?, ?, ?, ?, ?)";

        connectTOMySQL.query(sql, [FirstName,  LastName, age, email, phone, address, securePass], (err, result) => {
        if(err){
            return res.status(500).json({error: "internal server error"});
        }
        success = true;
        const str = "Signup Successfull"
        res.json({success, str});
    })
    })
})
    //login a user method post
    router.post("/login", [
        body("email", "Enter a valid email").isEmail(),
        body("password", "password is required").exists()
    ],
    async (req, res) => {
        let success = false;
        //for error by above checker
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

    const email = req.body.email;
    const password = req.body.password;

    let sql = 'select user_id, email, password from users where email=?';
    connectTOMySQL.query(sql, [email], (err, result, fields) => {
        if(err){
            return res.status(500).json({error: "internal server error"});
        }
        if(result==''){
            return res.status(400).json({error: "Please Enter valid credentials"});
        }
        const passwordCompare = bcrypt.compareSync(password, result[0].password);
        if(!passwordCompare){
            return res.status(400).json({error: "Please Enter valid credentials"});
        }
        success = true;
        const str = "Login Successfull"
        res.json({success, str, user_id: result[0].user_id});
    })

});


module.exports = router;