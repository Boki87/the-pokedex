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
      <div
        style={{
          width: `${progress}%`,
          background: `${color}`,
          height: "100%",
          borderRadius: "2px",
        }}
      ></div>
    </div>
  );
}
