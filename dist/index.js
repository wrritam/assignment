"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const dataFetch_1 = __importDefault(require("./routes/dataFetch"));
const app = (0, express_1.default)();
var cors = require("cors");
app.use(cors());
app.use(express_1.default.json());
const PORT = process.env.PORT || 4000;
app.get("/", (req, res) => {
    res.send("Backend is live.");
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.use("/api", dataFetch_1.default);
