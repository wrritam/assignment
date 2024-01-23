import express from "express";
import { Request, Response } from "express";
import "dotenv/config";
import dataFetch from "./routes/dataFetch";
const app = express();

var cors = require("cors");
app.use(cors());
app.use(express.json());

const port = 9000;

app.get("/", (req: Request, res: Response) => {
  res.send("Backend is live.");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use("/api", dataFetch);
