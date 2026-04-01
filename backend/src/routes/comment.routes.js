import { Router } from "express";
import {
  addComment,
  deleteComment,
  getVideoComments,
  updateComment,
} from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/authentication.middleware.js";

const router = Router();

// Public
// GET /api/v1/comment/:videoId
router.get("/:videoId", getVideoComments);

// Protected
// POST /api/v1/comment/:videoId
router.post("/:videoId", verifyJWT, addComment);
// PATCH /api/v1/comment/c/:commentId
router.patch("/c/:commentId", verifyJWT, updateComment);
// DELETE /api/v1/comment/c/:commentId
router.delete("/c/:commentId", verifyJWT, deleteComment);

export default router;
