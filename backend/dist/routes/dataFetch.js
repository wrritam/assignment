"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const axios_1 = __importDefault(require("axios"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    log: ["query"],
});
const fetchAndStoreData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get("https://api.wazirx.com/api/v2/tickers");
        const tickers = response.data;
        // sorting the tickers with respect to the buy price
        const sortedTickers = Object.values(tickers).sort((a, b) => parseFloat(b.buy) - parseFloat(a.buy));
        // Top 10 Data
        const topResults = sortedTickers.slice(0, 10);
        // Clear the previous
        yield prisma.data.deleteMany();
        // Storing the datas in DB
        for (const ticker of topResults) {
            yield prisma.data.create({
                data: {
                    name: ticker.name,
                    last: parseFloat(ticker.last),
                    buy: parseFloat(ticker.buy),
                    sell: parseFloat(ticker.sell),
                    volume: parseFloat(ticker.volume),
                    baseUnit: ticker.base_unit,
                },
            });
        }
        console.log("Data successfully collected and stored in the database.");
    }
    catch (error) {
        console.error("Unexpected error occured: ", error.message);
    }
});
fetchAndStoreData();
// updating every 30 minutes
setInterval(fetchAndStoreData, 1800000);
router.get("/getData", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const datas = yield prisma.data.findMany({});
        res.json(datas);
    }
    catch (error) {
        console.error("Error finding crypto data:", error.message);
        res.status(500).json({ error: "Unexpected error occured" });
    }
}));
exports.default = router;
