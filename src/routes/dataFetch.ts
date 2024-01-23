import express from "express";
const router = express.Router();
import { Request, Response } from "express";
import axios, { responseEncoding } from "axios";
import { PrismaClient } from "@prisma/client";
import { parse } from "path";

const prisma = new PrismaClient({
  log: ["query"],
});

interface Ticker {
  name: string;
  last: string;
  buy: string;
  sell: string;
  volume: string;
  base_unit: string;
}

const fetchAndStoreData = async () => {
  try {
    const response = await axios.get<{ [key: string]: Ticker }>(
      "https://api.wazirx.com/api/v2/tickers"
    );
    const tickers = response.data;

    // sorting the tickers with respect to the buy price

    const sortedTickers = Object.values(tickers).sort(
      (a, b) => parseFloat(b.buy) - parseFloat(a.buy)
    );

    // Top 10 Data
    const topResults = sortedTickers.slice(0, 10);

    // Clear the previous

    await prisma.data.deleteMany();

    // Storing the datas in DB
    for (const ticker of topResults) {
      await prisma.data.create({
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
  } catch (error) {
    console.error("Unexpected error occured: ", (error as Error).message);
  }
};

fetchAndStoreData();

// updating every 30 minutes

setInterval(fetchAndStoreData, 1800000);

router.get("/getData", async (req: Request, res: Response) => {
  try {
    const datas = await prisma.data.findMany({});
    res.json(datas);
  } catch (error) {
    console.error("Error finding crypto data:", (error as Error).message);
    res.status(500).json({ error: "Unexpected error occured" });
  }
});

export default router;
