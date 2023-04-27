const connectTOMySQL = require("../db");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.post('/pickup', async(req, res) => {

  const city = req.body.city;

  let sql = 'SELECT O.address, L.city_Name FROM office O INNER JOIN city L ON O.city_id=L.city_id WHERE O.city_id=?';
  connectTOMySQL.query(sql, [city], (err, result) => {
    if(err){
      return res.status(500).json({error: "Internal server error"});
    }
    if(result==''){
      return res.status(400).json({unavailble: "Office not availble, vehical will be deliverd"});
    }
    console.log(result)
    res.send("Office address")
  })
})

module.exports = router;