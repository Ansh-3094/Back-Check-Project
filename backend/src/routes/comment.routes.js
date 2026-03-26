import { Router } from "express";
import {
  addComment,
  deleteComment,
  getVideoComments,
  updateComment,
} from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Public
router.get("/video/:videoId", getVideoComments);

// Protected
router.post("/video/:videoId", verifyJWT, addComment);
router.patch("/comment/:commentId", verifyJWT, updateComment);
router.delete("/comment/:commentId", verifyJWT, deleteComment);

export default router;
