import StatBar from "../StatBar";
import { Pokemon } from "../../types/Pokemon";
import style from "./index.module.css";

export default function PokemonDetailsStats({ pokemon }: { pokemon: Pokemon }) {
  function formatName(val: string) {
    return val.split("-").join(" ");
  }

  return (
    <div>
      {pokemon.stats.map((p) => {
        return (
          <div className={style.pokemon_stats_row} key={p.name}>
            <div className={style.pokemon_stats_row__title}>
              <span>{formatName(p.name)}</span>
              <strong>{p.base_stat}</strong>
            </div>
            <StatBar value={p.base_stat} max={255} />
          </div>
        );
      })}
    </div>
  );
}
