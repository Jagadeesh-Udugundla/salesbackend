const mongoose =require("mongoose")
const Schema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

module.exports=mongoose.model("Data", Schema);