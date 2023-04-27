const Car = require("../models/Car");
const connectTOMySQL = require("../db");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");


//create new table method get route=/createCarTable
router.get("/createCarTable", (req, res) => {
  connectTOMySQL.query(Car, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send("Table created");
  });
});

//insert new car method post
router.post(
  "/insertcar",
  [
    body("Reg_No", "Enter valid Registration Number").isLength({ min: 4 }),
    body("Name", "Enter valid Name").isLength({ min: 3 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const Reg_No = req.body.Reg_No;
    const Name = req.body.Name;
    const model = req.body.model;
    const Image = req.body.Image;
    const Price = req.body.Price;
    const city_id = req.body.city_id;
    
    //check whether car already exits
    let car = "select Reg_No from cars where Reg_No=?";
    connectTOMySQL.query(car, [Reg_No], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "internal server error" });
      }
      if (result != "") {
        return res
          .status(400)
          .json({ error: "Registration Number already exits" });
      }

      let sql =
        "INSERT INTO `cars` (`Reg_No`, `car_Name`, `model`, `Image`, `Price`, `city_id`) VALUES (?, ?, ?, ?, ?, ?)";

      connectTOMySQL.query(
        sql,
        [Reg_No, Name, model, Image, Price, city_id],
        (err, result) => {
          if (err) {
            return res.status(500).json({ error: "internal server error" });
          }
          // console.log(result);
          success = true;
          const str = "Car added";
          res.json({success, str});
        }
      );
    });
  }
);

//search a car by it's city method post
router.post(
  "/city",
  [body("city", "Enter a valid city").isLength({ max: 1 })],
  async (req, res) => {
    let success = false;
    //for error by above checker
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const city = req.body.city;

    let sql =
      "select C.Reg_No, C.car_Name, C.model, C.Image, L.city_Name from cars C INNER JOIN city L ON C.city_id=L.city_id WHERE C.city_id=?;";
    connectTOMySQL.query(sql, [city], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "internal server error" });
      }
      if (result == "") {
        return res.status(400).json({ unavailble: "Service not Availble" });
      }

      // console.log(result);
      success = true;
      res.send({results: result});
    });
  }
);

//search by keywards method post
router.post(
  "/keyward",
  [
    body("keyward", "Enter a valid Keyward").isLength({ min: 3 }),
  ],
  async (req, res) => {
    let success = false;
    //for error by above checker
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const keyward = req.body.keyward;
    const dateFrom = req.body.dateFrom;
    const dateto = req.body.dateto;

    let sql = "select C.Reg_No, C.car_Name, C.model, C.Image from cars C WHERE C.Reg_No=any(select reg_num From orders where date_From NOT BETWEEN ? and ? AND date_to NOT BETWEEN ? and ? AND ? NOT BETWEEN date_From and Date_to AND ? NOT BETWEEN date_From and date_to) AND C.car_Name LIKE ?;";
    connectTOMySQL.query(sql, [dateFrom, dateto, dateFrom, dateto, dateFrom, dateto, '%'+keyward+'%'], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "internal server error" });
      }
      if (result == "") {
        return res.status(400).json({ unavailble: "Not Availble" });
      }

      // console.log(result);
      success = true;
      res.json({results: result, success});
    });
  }
);


//search a car by it's city method post
// router.post(
//   "/city",
//   [body("city", "Enter a valid city").isLength({ max: 1 })],
//   async (req, res) => {
//     //for error by above checker
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const city = req.body.city;

//     let sql =
//       "select C.Reg_No, C.car_Name, C.model, C.Image, L.city_Name from cars C INNER JOIN city L ON C.city_id=L.city_id WHERE C.city_id=?;";
//     connectTOMySQL.query(sql, [city], (err, result) => {
//       if (err) {
//         return res.status(500).json({ error: "internal server error" });
//       }
//       if (result == "") {
//         return res.status(400).json({ unavailble: "Service not Availble" });
//       }

//       // console.log(result);
//       res.json({results: result});
//     });
//   }
// );



//select all cars method post
router.post(
  "/cars",
  async (req, res) => {

    let sql =
      "select * from cars;";
    connectTOMySQL.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "internal server error" });
      }
      if (result == "") {
        return res.status(404).json({ unavailble: "Not found" });
      }

      // console.log(result);
      res.json({results: result})
    });
  }
);

//select all bookings method get
router.get(
  "/bookings",
  async (req, res) => {

    let sql =
      "select * from cars INNER JOIN orders ON orders.reg_Num=cars.Reg_No" ;
    connectTOMySQL.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "internal server error" });
      }
      if (result == "") {
        return res.status(404).json({ unavailble: "Not found" });
      }

      // console.log(result);
      res.json({results: result})
    });
  }
);

module.exports = router;
