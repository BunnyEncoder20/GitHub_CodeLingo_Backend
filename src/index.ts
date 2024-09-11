import dotenv from "dotenv";
import connectDB from "./db/connect";
import app from "./app";

dotenv.config({
	path: "./.env",
});

// Connecting to the db
connectDB()
.then(() => {

	// listening for any errors while starting server
	app.on("error",(err) => {
		console.error("[server] 💀 An error occurred while running the server.\n",err)
	})

	// Listening for requests
	app.listen(process.env.PORT || 8080, () => {
		console.log(`[server] ☕ CodeLingo server is running on port:${process.env.PORT || 8080}`);
	});
})
.catch((err) => {
	console.error("[server] ❌ MongoDB Connection Failed !!!\n",err)
})

