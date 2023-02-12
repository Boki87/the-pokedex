import PokemonTypePill from "../PokemonTypePill";
import style from "./index.module.css";
import { useRouter } from "next/router";

interface IPokemonCard {
  id: number;
  name: string;
  image: string;
  color: string;
  types: { name: string }[];
}

export default function PokemonCard({
  id,
  name,
  image,
  types,
  color,
}: IPokemonCard) {
  const router = useRouter();

  function gotoPokemon() {
    router.push(`/${id}`);
  }

  return (
    <div
      className={style.pokemon_card}
      style={{ backgroundColor: `var(--${color})` }}
      onClick={gotoPokemon}
    >
      <div className={style.pokemon_card__bg_layer}></div>

      <div className={style.pokemon_card__content_layer}>
        <div className={style.pokemon_card__left}>
          <span className={style.pokemon_card__id}>#{id}</span>
          <span className={style.pokemon_card__name}>{name}</span>
          <div className={style.pokemon_card__types}>
            {types.map((type) => (
              <PokemonTypePill name={type.name} showIcon key={type.name} />
            ))}
          </div>
        </div>
        <div className={style.pokemon_card__right}>
          <img src={image} />
        </div>
      </div>
    </div>
  );
}
