import { verifyJWT } from "../middlewares/authentication.middleware.js";
import { Router } from "express";
import {
  createTweet,
  updateTweet,
  deleteTweet,
  getUserTweets,
} from "../controllers/tweet.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router.use(verifyJWT);

router.route("/").post(upload.none(), createTweet);

router.route("/user/:userId").get(getUserTweets);

router.route("/:tweetId").patch(upload.none(), updateTweet).delete(deleteTweet);

export default router;
