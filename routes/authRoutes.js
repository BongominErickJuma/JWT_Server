import { Router } from "express";
import {
  login_get,
  signup_post,
  login_post,
  signup_get,
} from "../controllers/authCntrollers.js";
const authRoutes = Router();

authRoutes.get("/signup", signup_get);

authRoutes.get("/login", login_get);

authRoutes.post("/signup", signup_post);

authRoutes.post("/login", login_post);

export default authRoutes;
