var mongoose = require("mongoose");
mongoose.pluralize(null);

var FashionItemSchema = mongoose.Schema;

var FashionItemSchemaRef = new FashionItemSchema({
    _id:Number,
    fname:String,
    price:Number
});

var FashionItemModel = mongoose.model("FashionItem",FashionItemSchemaRef);

module.exports = FashionItemModel;