const Employee = require("../models/Employee");
const connectTOMySQL = require('../db');
const express = require('express');
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

//create new table method get route=/createEmployeeTable
router.get("/createEmployeeTable", (req, res) => {
    connectTOMySQL.query(Employee, (err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.send('Table created');
    })
})

//create new employee method post
router.post("/signup",[
    body("Name", "Enter a valid name").isLength({min: 3}),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({min: 5})
], async(req, res) => {
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const Name = req.body.Name;
    const email = req.body.email;
    const phone = req.body.phone;
    const salary = req.body.salary;
    const password = req.body.password;
    const office = req.body.office;

    //check whether employee already exits
    let employee = "select email from employee where email=?";
    connectTOMySQL.query(employee, [email], (err, result) => {
        if(err){
            return res.status(500).json({error: "internal server error"});
        }
        if(result!=''){
            return res.status(400).json({ error: "email already exits"});
        }

        //sceure password using bcryptjs
        // const salt = bcrypt.genSaltSync(10);
        const securePass = bcrypt.hashSync(password);

        let sql = "INSERT INTO `employee` (`Emp_id`, `Emp_Name`, `email`, `phone`, `Salary`, `password`, `Office_id`) VALUES (NULL, ?, ?, ?, ?, ?, ?);";

        connectTOMySQL.query(sql, [Name, email, phone, salary, securePass, office], (err, result) => {
        if(err){
            return res.status(500).json({error: "internal server error"});
        }
        // console.log(result);
        success = true;
        const str = "Employee added";
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

    let sql = 'select email, password from employee where email=?';
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

        // console.log(result);
        success = true;
        const str = "Employee loged in";
        res.json({success, str});
    })
    })
    //delete a customer method delete
    router.delete('/deleteuser', [
        body("user_id", "Enter a valid user Id").isLength({min: 1})
    ], async(req, res) => {
        let success = false;
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({errors: error.array()});
        }

        const user_id = req.body.user_id;

        let select = 'Select * FROM users WHERE user_Id=?'

        let sql = 'DELETE FROM `users` WHERE user_id=?';
        connectTOMySQL.query(select, [user_id], (err, result) => {
            if(err){
                return res.status(500).json({error: "Internal server error"});
            }
            if(result==''){
                return res.status(400).json({error: "Please Enter valid credentials"});
            }

            connectTOMySQL.query(sql, [user_id], (err, result) => {
                if(err){
                    return res.status(500).json({error: "Internal server error"});
                }

            // console.log(result);
            success = true;
            const str = "Customer deleted";
            res.json({success, str});
        })
    })
    })
//delete a customer method delete
router.delete('/deletecar', [
    body("Reg_No", "Enter a valid car Id").isLength({min: 1})
], async(req, res) => {
    let success = false;
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors: error.array()});
    }

    const Reg_No= req.body.Reg_No;

    let select = 'Select * FROM cars WHERE Reg_No LIKE ?'

    let sql = 'DELETE FROM `cars` WHERE Reg_No LIKE ?';
    connectTOMySQL.query(select, [Reg_No], (err, result) => {
        if(err){
            return res.status(500).json({error: "Internal server error"});
        }
        if(result==''){
            return res.status(400).json({error: "Please Enter valid credentials"});
        }

        connectTOMySQL.query(sql, [Reg_No], (err, result) => {
            if(err){
                return res.status(500).json({error: "Internal server error"});
            }

        // console.log(result);
        success = true;
        const str = "Car deleted";
        res.json({success, str});
    })
})
})

//recieve payment method post
router.post("/rcvpayment", [
    body("payment_id", "Enter a valid ID").isLength({min: 1}),
],
async (req, res) => {

    let success = 0;

    //for error by above checker
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

const payment_id = req.body.payment_id;

let sql = 'select status from payments where payment_id=?';
connectTOMySQL.query(sql, [payment_id], (err, result, fields) => {
    if(err){
        return res.status(500).json({error: "internal server error"});
    }
    if(result==''){
        return res.status(400).json({error: "Please Enter valid credentials"});
    }
    else if(result[0].status==1){
        success = 2;
        let error = "Payment Already Completed"
        return res.status(400).json({success, error});
    }
    else{
    let addPayment = "UPDATE payments SET status=1 WHERE payment_id=?";
    connectTOMySQL.query(addPayment, [payment_id], (err, result) => {
        if(err){
            return res.status(500).json({error: "internal server error"});
        }
        success = true;
        const str = "Payment recieved";
        res.json({success, str});
    })
    }
    // console.log(result);
})
})
//delete a customer method delete
router.delete('/deleteuser', [
    body("user_id", "Enter a valid user Id").isLength({min: 1})
], async(req, res) => {
    let success = false;
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors: error.array()});
    }

    const user_id = req.body.user_id;

    let select = 'Select * FROM users WHERE user_Id=?'

    let sql = 'DELETE FROM `users` WHERE user_id=?';
    connectTOMySQL.query(select, [user_id], (err, result) => {
        if(err){
            return res.status(500).json({error: "Internal server error"});
        }
        if(result==''){
            return res.status(400).json({error: "Please Enter valid credentials"});
        }

        connectTOMySQL.query(sql, [user_id], (err, result) => {
            if(err){
                return res.status(500).json({error: "Internal server error"});
            }

        // console.log(result);
        success = true;
        const str = "Customer deleted";
        res.json({success, str});
    })
})
})

//cancel booking method delete
router.delete('/cancelbooking', [
    body("Order_id", "Enter a valid Order ID").isLength({min: 1})
  ], async(req, res) => {
    let success = false;
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors: error.array()});
    }
  
    const Order_id= req.body.Order_id;
  
    let select = 'Select * FROM orders WHERE Order_id=?'
  
    let sql = 'DELETE FROM `orders` WHERE Order_id=?';
    connectTOMySQL.query(select, [Order_id], (err, result) => {
        if(err){
            return res.status(500).json({error: "Internal server error"});
        }
        if(result==''){
            return res.status(400).json({error: "Please Enter valid credentials"});
        }
  
        connectTOMySQL.query(sql, [Order_id], (err, result) => {
            if(err){
                return res.status(500).json({error: "Internal server error"});
            }
  
        // console.log(result);
        success = true;
        const str = "Order cancelled";
        res.json({success, str});
    })
  })
  })

module.exports = router;