import { motion } from "framer-motion";
import style from "./index.module.css";
import { IoMdClose } from "react-icons/io";

export default function HomeMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={style.home_menu}
    >
      <button onClick={onClose} className={style.home_menu__burger_btn}>
        <IoMdClose />
      </button>
      Menu
    </motion.div>
  );
}
