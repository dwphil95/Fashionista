var SaleModel = require("../models/Sale.js")

var StoreSale = (req, res) => {
    let sale = new SaleModel({
        username: req.body.username,
        cart: req.body.cart,
        totalPrice: req.body.totalPrice
    })

    sale.save((err, result) => {
        if (err)
            res.json({"msg": "Sale already exists"})
        else
            res.json({"msg": "Sale stored successfully"})
    })
}

module.exports = {StoreSale}