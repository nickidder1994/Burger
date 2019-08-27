var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

router.get("/", function (req, res) {
    burger.all(function (data) {
        var hbsObject = {
            burger: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});
router.post("/api/burger", function (req, res) {
    burger.create([
        "name", "double_double"
    ], [
        req.body.name, req.body.double_double
    ], function (result) {});
});
router.put("/api/burger/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  
    burger.update({
        double_double: req.body.double_double
      }, condition, function(result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
          res.status(200).end();
        }
      });
    });

    router.delete("/api/buger/:id", function(req, res) {
        var condition = "id = " + req.params.id;
      
        burger.delete(condition, function(result) {
            if (result.affectedRows == 0) {
                return res.status(404).end();
            } else {
              res.status(200).end();
            }
          });
        });
        
        module.exports = router;