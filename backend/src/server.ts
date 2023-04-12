// Importing Libraries
import express, { Application } from "express";
import * as dotenv from "dotenv";
import http from "http";
import cors from "cors";

// Importing dependencies
import dbConnect from "./config/connectionDB";
import Logging from "./utils/logging";
import { config } from "./config/config";
import Api, { Message } from "./utils/helper";
import router from "./routes/user.route";

dotenv.config();
/** DB configuration */
dbConnect();

/** Using Express Server */
const app: Application = express();

var whitelist = [process.env.CLIENT_URL];
var corsOptionsDelegate = function (req: any, callback: any) {
	var corsOptions;
	if (whitelist.indexOf(req.header("Origin")) !== -1) {
		corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
	} else {
		corsOptions = { origin: false }; // disable CORS for this request
	}
	callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));

/**  Only Start Server if Mongoose Connects */
const StartServer = () => {
	/** Log the request */
	app.use((req, res, next) => {
		/** Log the req */
		Logging.info(
			`Incoming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
		);

		res.on("finish", () => {
			/** Log the res */
			Logging.info(
				`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
			);
		});

		next();
	});

	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());

	/** Rules of our API */
	app.use((req, res, next) => {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept, Authorization"
		);
		if (req.method === "POST" && req.is("multipart/form-data")) {
			res.setHeader("Content-Type", "multipart/form-data");
		} else {
			res.setHeader("Content-Type", "application/json");
		}

		if (req.method == "OPTIONS") {
			res.setHeader(
				"Access-Control-Allow-Methods",
				"PUT, POST, PATCH, DELETE, GET"
			);
			return res.status(200).json({});
		}

		next();
	});

	/** Health Check */
	app.get("/ping", (req, res, next) =>
		Api.ok(res, { hello: "hello word" }, Message.Found)
	);

	/**  Routes */
	app.use("/api/user", router);

	/** Error handling */
	app.use((req, res, next) => {
		const error = new Error("Not found");

		Logging.error(error);
		Api.notFound(req, res, Message.NotFound);
	});

	http
		.createServer(app)
		.listen(config.server.port, () =>
			Logging.info(`Server is running on port ${config.server.port}`)
		);
};

StartServer();
