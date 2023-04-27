const connectTOMySQL = require("../db");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//order a new car method post
router.post(
  "/ordercar",
  [
    body("Reg_No", "Enter valid Registration Number").isLength({ min: 4 }),
    // body("user_id", "Enter valid user_id").isLength({min: 3}),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const Reg_No = req.body.Reg_No;
    const user_id = req.body.user_id;
    const date_From = req.body.date_From;
    const date_to = req.body.date_to;
    const price = req.body.price

    //check whether car exits or not
    let car = "SELECT car_Name FROM cars WHERE REG_No=?";
    connectTOMySQL.query(car, [Reg_No], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }
      if (result == "") {
        return res.status(400).json({ error: "Car not availble" });
      }

      //check whether car already booked
      let order = "SELECT * FROM orders Where reg_Num LIKE ?";
      connectTOMySQL.query(order, [Reg_No], (err, result) => {
        if (err) {
          return res.status(500).json({ error: "Internal server error" });
        }
        if (result != "") {
          let dates =
            "SELECT * FROM orders WHERE (reg_Num LIKE ?) and (date_From BETWEEN ? and ? OR date_to BETWEEN ? and ? OR ? BETWEEN date_From and Date_to OR ? BETWEEN date_From and date_to)";
          connectTOMySQL.query(
            dates,
            [
              Reg_No,
              date_From,
              date_to,
              date_From,
              date_to,
              date_From,
              date_to
            ],
            (err, result) => {
              if (err) {
                console.log("Hello2");
                return res.status(500).json({ error: "internal server error" });
              }
              if (result != "") {
                console.log(result);
                return res
                  .status(400)
                  .json({ error: "Car already Booked on these dates" });
              }

              let sql =
                "INSERT INTO `orders` (`reg_Num`, `user_id`, `date_From`, `Date_to`) VALUES (?, ?, ?, ?)";

              connectTOMySQL.query(
                sql,
                [Reg_No, user_id, date_From, date_to],
                (err, result) => {
                  if (err) {
                    console.log("hello3");
                    return res
                      .status(500)
                      .json({ error: "internal server error" });
                  }
                  let priceSql = "INSERT INTO payments (order_id, price) VALUES (?, ?)"
                  connectTOMySQL.query(
                    priceSql,
                    [Reg_No, price],
                    (err, result) => {
                      if (err) {
                        console.log("hello3");
                        return res
                          .status(500)
                          .json({ error: "internal server error" });
                      }
                      success = true;
                  let str = "Car Ordered";
                  res.json({success, str});
                    })
                }
              );
            }
          );
        }
        else{
          let sql =
                "INSERT INTO `orders` (`reg_Num`, `user_id`, `date_From`, `Date_to`) VALUES (?, ?, ?, ?)";
              connectTOMySQL.query(
                sql,
                [Reg_No, user_id, date_From, date_to],
                (err, result) => {
                  if (err) {
                    console.log("hello3");
                    return res
                      .status(500)
                      .json({ error: "internal server error" });
                  }
                  // console.log(result);
                  let priceSql = "INSERT INTO payments (order_id, price) VALUES (?, ?)"
                  connectTOMySQL.query(
                    priceSql,
                    [Reg_No, price],
                    (err, result) => {
                      if (err) {
                        console.log("hello3");
                        return res
                          .status(500)
                          .json({ error: "internal server error" });
                      }
                      success = true;
                  let str = "Car Ordered";
                  res.json({success, str});
                    })
                  // success = true;
                  // let str = "Car Ordered";
                  // res.json({success, str});
                })
                
        }
      });
    });
  }
);

module.exports = router;
