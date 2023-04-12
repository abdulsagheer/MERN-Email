// Importing Libraries
import jwt from "jsonwebtoken";
import { IUser } from "../interfaces/user";

/**
 * @description - Function for Generating Token with Mongo User ID and Secret Key
 **/
export const generateToken = (user: IUser) => {
	return jwt.sign(
		{ _id: user._id, name: user.name, email: user.email, role: user.role },
		String(process.env.JWT_KEY),
		{ expiresIn: "20d" }
	);
};
