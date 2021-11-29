const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

// import midleware

const errorMiddleware = require("./middleware/errors");
app.use(express.json());
app.use(cookieParser());

// import all routes
const productRouter = require("./routes/productRoutes");
const authRouter = require("./routes/authRoutes");
const orderRouter = require("./routes/orderRoutes");

// ROUTE
app.use("/api/v1", productRouter);
app.use("/api/v1", authRouter);
app.use("/api/v1", orderRouter);
// Middleware to handle errors
app.use(errorMiddleware);
module.exports = app;
