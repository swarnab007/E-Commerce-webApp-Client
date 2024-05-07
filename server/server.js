const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/database.js");
const userRoutes = require("./routes/Auth.router.js");

// congfiguring dotenv
dotenv.config({ path: "./.env" });
// Database connection
connectDB();

// express server
const app = express();

// middlewares
app.use(express.json());
app.use(morgan("dev"));

// defining routes for users
app.use("/api/v1/users", userRoutes);

const PORT = process.env.PORT || 3000;

// check server
app.get("/", (req, res) => {
  res.send("<h1>Working</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.DEV_MODE} on port ${PORT}`);
});
