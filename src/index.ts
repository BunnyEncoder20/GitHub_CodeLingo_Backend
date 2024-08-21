import dotenv from "dotenv";
import connectDB from "./db/connect";

import app from "./app";

dotenv.config({
	path: "./.env",
});

// Connecting to the db
connectDB();

app.listen(process.env.PORT || 8080, () => {
	console.log(`[server] CodeLingo server is running on port:${process.env.PORT || 8080}`);
});
