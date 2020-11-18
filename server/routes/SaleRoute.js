var express = require("express");
var router = express.Router();

var SaleController = require("../controllers/SaleController.js");

router.post("/storeSale", SaleController.StoreSale)

module.exports = router;