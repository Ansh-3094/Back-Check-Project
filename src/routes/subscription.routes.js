import { Router } from "express";
import { verifyJWT } from "../middlewares/authentication.middleware.js";
import {
  toggleSubscription,
  getUserChannelSubscribers,
  getSubscribedChannels,
} from "../controllers/subscription.controller.js";

const router = Router();

router.post("/channels/:channelId/subscribe", verifyJWT, toggleSubscription);
router.get(
  "/channels/:channelId/subscribers",
  verifyJWT,
  getUserChannelSubscribers
);
router.get("/users/:userId/subscriptions", getSubscribedChannels);

export default router;
