import style from "./index.module.css";
import { FaLongArrowAltLeft } from "react-icons/fa";
import PokemonTypePill from "../PokemonTypePill";
import { Pokemon } from "../../types/Pokemon";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import { useFavorites } from "../../utils/useFavorites";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

interface IPokemonPageHeader {
  pokemon: Pokemon;
}

export default function PokemonPageHeader({ pokemon }: IPokemonPageHeader) {
  const router = useRouter();

  const { favoritePokemon, addPokemon, removePokemon } = useFavorites();

  function addToFavoritesHandler() {
    const isInFavs = favoritePokemon.map((p) => p.id).includes(pokemon.id);

    if (isInFavs) {
      removePokemon(pokemon.id);
    } else {
      addPokemon(pokemon);
    }
  }

  function goPrev() {
    if (pokemon.id > 1) {
      router.push(`/${pokemon.id - 1}`);
    }
  }

  function goNext() {
    router.push(`/${pokemon.id + 1}`);
  }

  return (
    <div className={style.pokemon_page_header}>
      <div className={style.pokemon_page_header__bg_layer}></div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className={style.pokemon_page_header__content_layer}
      >
        <div className={style.pokemon_page_header__nav}>
          <button
            onClick={() => router.push("/")}
            className={style.pokemon_page_header__button}
          >
            <FaLongArrowAltLeft />
          </button>

          <button
            onClick={addToFavoritesHandler}
            className={style.pokemon_page_header__button}
          >
            {!favoritePokemon.map((p) => p.id).includes(pokemon.id) ? (
              <AiOutlineStar />
            ) : (
              <AiTwotoneStar />
            )}
          </button>
        </div>
        <div className={style.pokemon_page_header__pokemon}>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span className={style.pokemon_page_header__pokemon_name}>
              {pokemon?.name}
            </span>
            <span className={style.pokemon_page_header__pokemon_id}>
              #{pokemon?.id}
            </span>
          </div>
        </div>
        <div style={{ display: "flex", width: "100%" }}>
          {pokemon?.types.map((type) => (
            <PokemonTypePill name={type.name} showIcon key={type.name} />
          ))}
        </div>
        <div
          onClick={goPrev}
          style={{
            width: "40px",
            height: "60px",
            position: "absolute",
            top: "50%",
            left: "0px",
            zIndex: 1000,
            cursor: "pointer",
            color: "white",
            fontSize: "2.5rem",
          }}
        >
          <BsChevronCompactLeft />
        </div>
        <div
          onClick={goNext}
          style={{
            width: "40px",
            height: "60px",
            position: "absolute",
            top: "50%",
            right: "0px",
            zIndex: 1000,
            cursor: "pointer",
            color: "white",
            fontSize: "2.5rem",
          }}
        >
          <BsChevronCompactRight />
        </div>
      </motion.div>
    </div>
  );
}
