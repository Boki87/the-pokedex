import StatBar from "../StatBar";
import { Pokemon } from "../../types/Pokemon";
import style from "./index.module.css";

export default function PokemonDetailsAbout({ pokemon }: { pokemon: Pokemon }) {
  function formatHeight(val: number) {
    return val / 10 + " m";
  }

  function formatWeight(val: number) {
    return val / 10 + " kg";
  }

  return (
    <div className={style.pokemon_about}>
      <p>{pokemon.details}</p>
      <div className={style.pokemon_about__row}>
        <span>Height</span>
        <strong>{formatHeight(pokemon.height)}</strong>
      </div>
      <div className={style.pokemon_about__row}>
        <span>Weight</span>
        <strong>{formatWeight(pokemon.weight)}</strong>
      </div>
      <div className={style.pokemon_about__row}>
        <span>Base Happiness</span>
        <div>
          <StatBar value={pokemon.base_happiness} max={255} />
        </div>
      </div>
      <div className={style.pokemon_about__row}>
        <span>Abilities</span>
        <div style={{ display: "flex", gap: "5px" }}>
          {pokemon.abilities.map((a) => (
            <div className={style.pokemon_about__ability} key={a.name}>
              {a.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
