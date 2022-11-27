import express from "express";
import { Express } from 'express';
import { router } from "./routes/routes";

const app = express();
const port = process.env.PORT || 4200;

app.use("/users", router);

const server = app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});