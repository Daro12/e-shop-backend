const Product = require("../models/product");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const products = require("../data/products");

// Setting dotenv file
dotenv.config({ path: "server/config/config.env" });

// connect to mongo db databse
mongoose
  .connect(process.env.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
  });

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Products are deleted");

    await Product.insertMany(products);
    console.log("All Products are added.");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();
