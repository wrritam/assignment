import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
export const Switch = ({
  checked,
  setChecked,
}: {
  checked: boolean,
  setChecked: (checked: boolean) => void,
}) => {
  return (
    <form className="flex space-x-4 antialiased items-center">
      <label
        htmlFor="checkbox"
        className={twMerge(
          "h-8 px-1 flex items-center shadow-[inset_0px_0px_12px_rgba(0,0,0,0.25)] rounded-full w-[60px] relative cursor-pointer transition duration-200",
          checked ? "bg-[#2E3241]" : "bg-[#F8F9FA]"
        )}
      >
        <motion.div
          initial={{
            width: "20px",
            x: checked ? 0 : 32,
          }}
          animate={{
            height: ["20px", "10px", "20px"],
            width: ["20px", "30px", "20px", "20px"],
            x: checked ? 32 : 0,
          }}
          transition={{
            duration: 0.3,
            delay: 0.1,
          }}
          key={String(checked)}
          className={twMerge(
            "h-[20px] block rounded-full shadow-md z-10", checked ? 'bg-[#6BC9CB]' : 'bg-white'
          )}
        ></motion.div>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          className="hidden"
          id="checkbox"
        />
      </label>
    </form>
  );
};
