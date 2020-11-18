var mongoose = require("mongoose");
const FashionItemModel = require("./FashionItem").schema;
mongoose.pluralize(null);

var CartItemSchema = mongoose.Schema
var CartItemSchemaRef = new CartItemSchema({
    fashionItem: FashionItemModel,
    quantity: Number
})
var CartItemModel = mongoose.model("CartItem", CartItemSchemaRef).schema

var SaleSchema = mongoose.Schema;
var SaleSchemaRef = new SaleSchema({
    username: String,
    cart: [CartItemModel],
    totalPrice: Number
})
var SaleModel = mongoose.model("Sale",SaleSchemaRef);

module.exports = SaleModel;