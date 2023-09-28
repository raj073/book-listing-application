import cors from "cors";
import express, { Application } from "express";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

export default app;
