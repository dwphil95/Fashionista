var FashionItemModel = require("../models/FashionItem.js");

var GetFashionItemFromDb = (req, res) => {
    FashionItemModel.find({}, (err, data) => {
        if (err) throw err
        res.json(data)
    })
}

var GetFashionItemById = (req, res) => {
    var id = req.params.id
    FashionItemModel.find({_id: id}, (err, data) => {
        if (err) throw err
        console.log(data)
        res.json(data)
    })
}

var StoreFashionItem = (req, res) => {
    let fashionItem = new FashionItemModel({
        _id: req.body._id,
        fname: req.body.fname,
        price: req.body.price
    })

    fashionItem.save((err, result) => {
        if (err)
            res.json({"msg": "ID already exists"})
        else
            res.json({"msg": "Fashion item stored successfully"})
    })
}

var UpdateFashionItem = (req, res) => {
    var updateId = req.body._id
    var updateName = req.body.fname
    var updatePrice = req.body.price
    FashionItemModel.update({_id: updateId}, {$set:{fname:updateName, price: updatePrice}}, (err, result) => {
        if (err) throw err
        if (result.nModified > 0)
            res.json({"msg": "Fashion item updated successfully"})
        else
            res.json({"msg": "Fashion item didn't update"})
    })
}

var DeleteFashionItem = (req, res) => {
    var deleteId = req.params.id
    FashionItemModel.deleteOne({_id: deleteId}, (err, result) => {
        if (err) throw err
        if (result.deletedCount > 0)
            res.json({"msg": "Fashion item deleted successfully"})
        else
            res.json({"msg": "Fashion item doesn't exist"})
    })
}

module.exports = {GetFashionItemFromDb,GetFashionItemById,StoreFashionItem,UpdateFashionItem,DeleteFashionItem}