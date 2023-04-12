import { Response } from "express";
import { User } from "../models/User";
import { sendInviteEmail } from "../utils/invite";
import Api, { Message } from "../utils/helper";
import expressAsyncHandler from "express-async-handler";
import { Notification } from "../models/Notification";

export const inviteUserController = expressAsyncHandler(
	async (req: any, res: Response) => {
		const { email } = req.body;
		const host = process.env.CLIENT_URL as string;
		try {
			// check if user already exists
			const userExists = await User.findOne({ email });
			if (userExists) {
				return Api.badRequest(res, " ", Message.UserExist);
			}

			// create user
			const user = new User({ email });
			await user.save();

			// send invite email
			await sendInviteEmail(email, host);

			Api.created(res, { user }, "User invited successfully");
		} catch (error: any) {
			return Api.serverError(req, res, error, Message.ServerError);
		}
	}
);

export const signInUserController = expressAsyncHandler(
	async (req: any, res: Response) => {
		try {
			const user = req.user; // assuming user is authenticated and stored in req.user

			// update user sign-in status
			user.signedIn = true;
			await user.save();
			const notification = new Notification({
				userId: user._id,
				message: "User signed in successfully",
			});
			await notification.save();

			Api.created(res, { user }, "User signed in successfully");
		} catch (error: any) {
			return Api.serverError(req, res, error, Message.ServerError);
		}
	}
);
