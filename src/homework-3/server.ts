import express from "express";
import { router } from "./routes/routes";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4200;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());
app.use("/users", router);

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});