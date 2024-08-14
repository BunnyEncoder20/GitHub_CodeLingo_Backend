import mongoose from "mongoose";

const uri = "mongodb+srv://vitstorage2022:P8a0Bj8NDIv4AjPp@codelingocluster.qzyg9.mongodb.net";

mongoose
	.connect(uri)
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("Failed to connect to MongoDB", err));
