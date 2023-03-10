import { motion } from "framer-motion";
import { useMemo } from "react";

interface IStatBar {
  value: number;
  max: number;
  [x: string]: any;
}

export default function StatBar({ value, max, ...rest }: IStatBar) {
  const progress = useMemo(() => {
    return (value / max) * 100;
  }, [value, max]);

  const color = useMemo(() => {
    if (progress < 50) {
      return "var(--red)";
    } else {
      return "var(--green)";
    }
  }, [progress]);

  return (
    <div
      style={{
        height: "4px",
        borderRadius: "2px",
        background: "var(--color-gray)",
        width: "100%",
      }}
      {...rest}
    >
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1 }}
        style={{
          background: `${color}`,
          height: "100%",
          borderRadius: "2px",
        }}
      ></motion.div>
    </div>
  );
}
