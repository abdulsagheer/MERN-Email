import nodemailer from "nodemailer";

export const sendInviteEmail = async (email: string, host: string) => {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	const mailOptions = {
		from: "abdusagheeras29@gmail.com",
		to: email,
		subject: "You have been invited to join Your Invity",
		html: `
        <p>Hello,</p>
        <p>You have been invited to join Your Invity by ${host}.</p>
        <p>Please click on the following link to sign in:</p>
        <p><a href="https://localhost:5173">https://localhost:5173</a></p>
    `,
	};

	await transporter.sendMail(mailOptions);
};
