const mongoose = require("mongoose");
// mongodbURL here 
mongoose.connect("mongodb://localhost:27017/roxiler");

const transactionSchema = mongoose.Schema({
    title: String,
    decription : String,
    price : Number,
    category: String,
    sold : Boolean,
    image: String
})

module.exports = mongoose.model("transactions", transactionSchema); 