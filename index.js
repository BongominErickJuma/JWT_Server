import express from "express";
import env from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import { authenticateJWT } from "./controllers/authCntrollers.js";

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

app.get("/products", authenticateJWT, (req, res) => {
  res.status(200).send("Welcome to JWT Product Page");
});
app.use(authRoutes);

app.listen(port, () => {
  console.log(`Listening for request on port ${port}`);
});
