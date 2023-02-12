import { useState } from "react";
import Image from "next/image";
import style from "./index.module.css";
import { Pokemon } from "../../types/Pokemon";
import PokemonDetailsAbout from "../PokemonDetailsAbout";
import PokemonDetailsStats from "../PokemonDetailsStats";
import PokemonEvolutions from "../PokemonEvolutions";
import PokemonMoves from "../PokemonMoves";

export default function PokemonDetails({ pokemon }: { pokemon: Pokemon }) {
  const [activeTab, setActiveTab] = useState("about");

  const tabContent: { [x: string]: any } = {
    about: <PokemonDetailsAbout pokemon={pokemon} />,
    stats: <PokemonDetailsStats pokemon={pokemon} />,
    evolution: <PokemonEvolutions pokemon={pokemon} />,
    moves: <PokemonMoves pokemon={pokemon} />,
  };

  function isActive(tab: string) {
    return activeTab === tab
      ? `${style.pokemon_details__tab_nav} ${style.active_nav}`
      : `${style.pokemon_details__tab_nav}`;
  }

  return (
    <div className={style.pokemon_details}>
      <div className={style.pokemon_details__image_container}>
        <Image
          src={pokemon?.image}
          width={250}
          height={250}
          alt="pokemon image"
        />
      </div>

      <div className={style.pokemon_details__tab_navs}>
        <div
          onClick={() => setActiveTab("about")}
          className={isActive("about")}
        >
          About
        </div>
        <div
          onClick={() => setActiveTab("stats")}
          className={isActive("stats")}
        >
          Base Stats
        </div>
        <div
          onClick={() => setActiveTab("evolution")}
          className={isActive("evolution")}
        >
          Evolution
        </div>
        <div
          onClick={() => setActiveTab("moves")}
          className={isActive("moves")}
        >
          Moves
        </div>
      </div>

      <div>{tabContent[activeTab]}</div>
    </div>
  );
}
