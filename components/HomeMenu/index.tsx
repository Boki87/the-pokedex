import { motion } from "framer-motion";
import style from "./index.module.css";
import { IoMdClose } from "react-icons/io";
import PokemonCard from "../PokemonCard";
import { useFavorites } from "../../utils/useFavorites";

export default function HomeMenu({ onClose }: { onClose: () => void }) {
  const { favoritePokemon } = useFavorites();

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
      <div
        style={{
          height: "50px",
          marginTop: "50px",
          fontSize: "1.7rem",
          fontWeight: "bolder",
          textAlign: "center",
          color: "#333",
        }}
      >
        Favorite Pokemon
      </div>
      <div
        style={{
          marginTop: "10px",
          flex: 1,
          overflowY: "auto",
          padding: "0px 10px",
        }}
      >
        {favoritePokemon
          .sort((a, b) => {
            return a.id - b.id;
          })
          .map((pokemon) => (
            <PokemonCard
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              color={pokemon.color}
              types={pokemon.types}
              key={pokemon.id}
            />
          ))}
      </div>
    </motion.div>
  );
}
