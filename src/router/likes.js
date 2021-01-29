import { Router } from "express";
import { LikePost, disLikePost } from "../controllers/likes";
import authGuard from "../guards/verifyToken";

const router = new Router();

router.patch("/like/:id", authGuard, LikePost);
router.patch("/dislike/:id", authGuard, disLikePost);

export default router;
