import express from "express";
import { router } from "./routes/routes";

const app = express();
const port = process.env.PORT || 4200;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", router);

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});