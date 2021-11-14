import express from "express";
const router = express.Router();
import { getmessages, newMessage } from "../controllers/chat.js"

import RequireLogin from "../middlewares/RequireLogin.js"

router.post("/new",RequireLogin,newMessage)
router.get("/getmessages/:id",RequireLogin,getmessages)
export {router}