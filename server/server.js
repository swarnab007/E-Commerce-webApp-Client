const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const connectDB = require("./config/database.js");
const userRoutes = require("./routes/Auth.router.js");
const categoryRoutes = require("./routes/Category.router.js");
const productRoutes = require("./routes/Product.router.js");
const bodyParser = require("body-parser");

// congfiguring dotenv
dotenv.config({ path: "./.env" });
// Database connection
connectDB();

// express server
const app = express();

// cors
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: "50mb" })); // Increase to 50mb or any value as needed
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// middlewares
app.use(express.json());
app.use(morgan("dev"));

// defining routes for users
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/products", productRoutes);

const PORT = process.env.PORT || 3000;

// check server
app.get("/", (req, res) => {
  res.send("<h1>Working</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.DEV_MODE} on port ${PORT}`);
});
