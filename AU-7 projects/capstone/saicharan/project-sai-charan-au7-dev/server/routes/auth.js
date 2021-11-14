import express from "express";
const router = express.Router();
import { recover, signin, signup, verify } from "../controllers/auth.js";

router.post("/signin", signin);
router.post("/signup", signup);

//Signup Email Verify
router.get("/verify/:token", verify);
router.post("/forgot",recover);

export { router };
