import { Router } from "express";
import {
  Create,
  FindAllOwned,
  FindOne,
  Delete,
  Update,
  FindAll,
} from "../controllers/posts";
import authGuard from "../guards/verifyToken";

const router = new Router();

router.post("/", authGuard, Create);
router.get("/user", authGuard, FindAllOwned);
router.get("/find", FindAll);
router.get("/:id", FindOne);
router.delete("/:id", authGuard, Delete);
router.put("/:id", authGuard, Update);

export default router;
