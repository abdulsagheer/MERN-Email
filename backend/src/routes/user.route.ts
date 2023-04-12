// Importing Libraries
import express from "express";
import passport from "passport";

// Importing dependencies
import { inviteUserController } from "../controllers/user.controller";
import { signInUserController } from "../controllers/user.controller";

const router = express.Router();

// Google Sign-In routes
router.get(
	"/auth/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);
router.post(
	"/auth/google/callback",
	passport.authenticate("google"),
	signInUserController
);

// User invite route
router.post("/invite", inviteUserController);

export default router;
