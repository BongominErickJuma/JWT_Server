import express from "express";
import env from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import { authenticateJWT } from "./controllers/authCntrollers.js";
import products from "./products/products.js";

env.config();
const app = express();
const port = 3000;

// middleware
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.status(200).send("Welcome to JWT");
});

app.get("/products", (req, res) => {
  res.status(200).send(products);
});

app.get("/cart", authenticateJWT, (req, res) => {
  res.status(200).send(products);
});
app.use(authRoutes);

app.listen(port, () => {
  console.log(`Listening for request on port ${port}`);
});
