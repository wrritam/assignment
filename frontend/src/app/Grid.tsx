import { Item } from "@/types/item";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface DarkModeProps {
  checked: boolean;
}

const Grid: React.FC<DarkModeProps> = ({ checked }) => {
  const [data, setData] = useState<Item[] | null>(null);
  const [timer, setTimer] = useState(false);

  setInterval(() => {
    setTimer(!timer);
  }, 60000);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://assignment-production-task.up.railway.app/api/getData"
        );
        const result = response.data;
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [timer]);

  const getTop10 = () => {
    if (!data) return [];
    const sortedData = [...data].sort(
      (a, b) => b.sell - b.buy - (a.sell - a.buy)
    );
    return sortedData.slice(0, 10);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    })
      .format(value)
      .replace(/^(\D+)/, "$1 ");
  };

  const calculatePercentage = (sell: number, buy: number) => {
    const difference = sell - buy;
    const percentage = (difference / buy) * 100;
    return percentage;
  };

  const calculatePercentageColor = (percentage: number) => {
    return percentage >= 0 ? "text-[#6BC9CB]" : "text-[#D75656]";
  };

  const calculateSaings = (sell: number, buy: number) => {
    const difference = sell - buy;
    return difference;
  };

  return (
    <div className="phone:flex phone:flex-col scroll tablet:grid gap-3 w-[95%] mx-auto mt-10 overflow-scroll">
      <div className="py-3 phone:flex phone:justify-between tablet:grid tablet:grid-cols-[0.5fr_1fr_1.5fr_2.5fr_1.5fr_1fr] phone:text-sm tablet:text-xl text-neutral-600">
        <p className="text-center">#</p>
        <p className="text-center">Name</p>
        <p className="text-center">Last Traded Price</p>
        <p className="text-center">Buy / Sell Price</p>
        <p className="text-center">Difference</p>
        <p className="text-center">Savings</p>
      </div>
      {getTop10().map((datum: Item, index: number) => (
        <div
          key={datum.id}
          className={`${
            checked ? "bg-[#2E3241]" : "bg-neutral-100"
          } tablet:grid tablet:grid-cols-[0.5fr_1fr_1.5fr_2.5fr_1.5fr_1fr] scroll phone:px-2 tablet:px-0 py-5 rounded phone:flex phone:justify-between phone:text-sm tablet:text-xl overflow-x-scroll`}
        >
          <p className="text-center">{index + 1}</p>
          <p className="text-center">{datum.name}</p>
          <p className="text-center">{formatCurrency(datum.last)}</p>
          <p className="text-center">{`${formatCurrency(
            datum.buy
          )} / ${formatCurrency(datum.sell)}`}</p>
          <p
            className={`text-center ${calculatePercentageColor(
              calculatePercentage(datum.sell, datum.buy)
            )}`}
          >
            <span
              className={calculatePercentageColor(
                calculatePercentage(datum.sell, datum.buy)
              )}
            >
              {`${calculatePercentage(datum.sell, datum.buy).toFixed(2)}%`}
            </span>
          </p>
          <p className="text-center uppercase">
            {formatCurrency(
              Number(calculateSaings(datum.sell, datum.buy).toFixed(2))
            )}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Grid;
