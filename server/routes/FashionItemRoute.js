var express = require("express");
var router = express.Router();

var FashionItemController = require("../controllers/FashionItemController.js");

router.get("/fashionItemsFromDb",FashionItemController.GetFashionItemFromDb);
router.get("/fashionItemById/:id",FashionItemController.GetFashionItemById) 
router.post("/storeFashionItem",FashionItemController.StoreFashionItem);
router.put("/updateFashionItem",FashionItemController.UpdateFashionItem);
router.delete("/deleteFashionItemById/:id",FashionItemController.DeleteFashionItem);

module.exports = router;