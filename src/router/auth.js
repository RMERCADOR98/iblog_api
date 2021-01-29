import { Router } from "express";
import { SignIn, SignUp } from "../controllers/auth";

const router = new Router();

router.post("/signup", SignUp);
router.post("/signin", SignIn);

export default router;
