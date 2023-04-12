import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/user";

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	signedIn: {
		type: Boolean,
		default: false,
	},
});

export const User = model<IUser>("User", UserSchema);
