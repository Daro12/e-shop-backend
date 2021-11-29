const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Setting up config file
dotenv.config({ path: "server/config/config.env" });

// UNCAUGHT EXCEPTION
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});
// connect to mongo db databse
mongoose
  .connect(process.env.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
  });

// STARTING THE SERVER
app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

// UNHANDLE REJECTION
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log("UNHANDLED REJECTION! Shutting down...");
  //console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
