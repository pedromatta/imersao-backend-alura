import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost, deletarNovoPost } from "../controller/postController.js";
import cors from "cors";

const corsOptions = {
	origin: "http://localhost:8000",
	optionsSuccessStatus: 200
}

// Para windows
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	}
})

const upload = multer({ dest:"./uploads", storage });

// Para linux ou mac
// const upload = multer({dest:"./uploads"});

const routes = (app) => {
	app.use(express.json());

	app.use(cors(corsOptions));

	app.get("/posts", listarPosts);
	
	app.post("/posts", postarNovoPost);
	
	app.post("/upload", upload.single("imagem"), uploadImagem);
	
	app.put("/upload/:id", atualizarNovoPost);

	app.delete("/posts/:id", deletarNovoPost);
}

export default routes;