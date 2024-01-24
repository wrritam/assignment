import React, { useEffect, useState } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import { Item } from "@/types/item";
import { Switch } from "@/components/Switch";
import { Link } from "react-router-dom";

interface DarkModeProps {
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<DarkModeProps> = ({ checked, setChecked }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = useState("");
  const [currencyNames, setCurrencyNames] = useState<string[]>([]);
  const initialCountdown = 60;
  const [countdown, setCountdown] = useState(initialCountdown);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) =>
        prevCountdown === 0 ? initialCountdown : prevCountdown - 1
      );
    }, 1000);
    return () => clearInterval(intervalId);
  }, [initialCountdown]);

  useEffect(() => {
    const getCurrencies = async () => {
      const response = await axios.get(
        "https://assignment-production-task.up.railway.app/api/getData"
      );
      const result = response.data;
      console.log(result);
      const allCurrencies = result.map((item: Item) => item.baseUnit);
      const uniqueCurrencies = [...new Set(allCurrencies)];
      setCurrencyNames(uniqueCurrencies as string[]);
      setValue(uniqueCurrencies[0] as string);
    };
    getCurrencies();
  }, []);

  useEffect(() => {
    console.log(value);
    console.log(currencyNames);
  }, [value]);
  return (
    <div className="phone:flex phone:flex-col tablet:grid tablet:grid-cols-3 phone:gap-4 tablet:gap-0 justify-between px-10 py-4 mx-auto">
      <h1 className="text-[#6BC9CB] text-6xl text-center mx-auto">Hodlinfo</h1>
      <div className="flex gap-5 phone:text-sm tablet:text-base mx-auto">
        <Popover>
          <PopoverTrigger asChild className="flex my-auto gap-2">
            <button
              className={`justify-between uppercase ${
                checked
                  ? "bg-[#2E3241] shadow-[#2E3241]"
                  : "bg-neutral-100 shadow-neutral-200"
              } shadow-[inset_0px_0px_12px_rgba(0,0,0,0.25)] rounded-xl px-4 py-2`}
            >
              INR
              <CaretSortIcon className="my-auto w-5 h-5" />
            </button>
          </PopoverTrigger>
        </Popover>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild className="flex my-auto gap-2">
            <button
              className={`justify-between uppercase ${
                checked
                  ? "bg-[#2E3241] shadow-[#2E3241]"
                  : "bg-neutral-100 shadow-neutral-200"
              } shadow-[inset_0px_0px_12px_rgba(0,0,0,0.25)] rounded-xl px-4 py-2`}
            >
              {value}
              <CaretSortIcon className="my-auto w-5 h-5" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Command>
              <CommandGroup>
                {currencyNames.map((currency) => (
                  <CommandItem
                    key={currency}
                    value={currency}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                    className="uppercase"
                  >
                    {currency}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-5 w-5",
                        value === currency ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild className="flex my-auto gap-2">
            <Link
              to="https://wazirx.com/invite/sp7pvbt6"
              className={`justify-between uppercase ${
                checked
                  ? "bg-[#2E3241] shadow-[#2E3241]"
                  : "bg-neutral-100 shadow-neutral-200"
              } shadow-[inset_0px_0px_12px_rgba(0,0,0,0.25)] rounded-xl px-4 py-2`}
            >
              BUY BTC
            </Link>
          </PopoverTrigger>
        </Popover>
      </div>
      <div className="flex gap-5 m-auto">
        <p className="my-auto rounded-full text-[#6BC9CB]">{countdown}</p>
        <button className="flex gap-3 bg-[#3DC6C1] px-5 py-2 rounded-xl">
          <img
            src="/icons/paper-plane.svg"
            alt="plane"
            className="my-auto w-5 h-5"
          />
          <p className="tracking-tight text-white">Connect Telegram</p>
        </button>
        <Switch checked={checked} setChecked={setChecked} />
      </div>
    </div>
  );
};

export default Navbar;
