// Importing Libraries
import { Document } from "mongoose";

export interface IUser extends Document {
	email: string;
	signedIn: boolean;
}
