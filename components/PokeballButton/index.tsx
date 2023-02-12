import Image from "next/image";
import style from "./index.module.css";

export default function PokeballButton({ ...props }) {
  return (
    <button className={style.poke_button} {...props}>
      <Image
        src="/images/pokeball.png"
        width={60}
        height={60}
        alt="back to top button image"
      />
    </button>
  );
}
