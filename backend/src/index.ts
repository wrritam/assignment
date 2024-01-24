import express from "express";
import { Request, Response } from "express";
import "dotenv/config";
import dataFetch from "./routes/dataFetch";
const app = express();

var cors = require("cors");
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get("/", (req: Request, res: Response) => {
  res.send("Backend is live.");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/api", dataFetch);
