const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const DataSchema = require("./DataSchema");

const app = express();

mongoose.connect("mongodb+srv://jagadeeshu9951:saleassist@cluster0.uspkv5c.mongodb.net/yourDatabaseName?retryWrites=true&w=majority").then(
    () => console.log("Db connected")
).catch(error => console.error("Error connecting to the database", error));

app.use(express.json());
app.use(cors({ origin: "*" }));

app.post('/senddata', async (req, res) => {
    try {
        const { image, price, name, discount } = req.body;
        if (!image || !price || !name) {
            return res.status(400).json({ error: 'All fields are required.' });
        }
        const newData = new DataSchema({
            image,
            price,
            discount,
            name
        });
        await newData.save();
        res.status(200).json({ message: 'Data saved successfully.' });
    } catch (error) {
        console.error("Something went wrong:", error);
        return res.status(500).json("Internal Server Error");
    }
});

app.get("/getdata", async (req, res) => {
    try {
        const data = await DataSchema.find();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error while getting data:", error);
        return res.status(500).json("Internal Server Error");
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
