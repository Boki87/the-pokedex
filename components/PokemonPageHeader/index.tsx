import style from "./index.module.css";
import { FaLongArrowAltLeft } from "react-icons/fa";
import PokemonTypePill from "../PokemonTypePill";
import { Pokemon } from "../../types/Pokemon";
import { useRouter } from "next/router";

interface IPokemonPageHeader {
  pokemon: Pokemon;
}

export default function PokemonPageHeader({ pokemon }: IPokemonPageHeader) {
  const router = useRouter();

  return (
    <div className={style.pokemon_page_header}>
      <div className={style.pokemon_page_header__bg_layer}></div>
      <div className={style.pokemon_page_header__content_layer}>
        <div className={style.pokemon_page_header__nav}>
          <button
            onClick={() => router.push("/")}
            className={style.pokemon_page_header__back}
          >
            <FaLongArrowAltLeft />
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
      </div>
    </div>
  );
}
