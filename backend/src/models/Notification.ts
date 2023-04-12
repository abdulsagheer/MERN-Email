import { Schema, model } from "mongoose";
import { INotification } from "../interfaces/notification";

const NotificationSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	message: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export const Notification = model<INotification>(
	"Notification",
	NotificationSchema
);
