import { GetServerSideProps } from "next";
import { Pokemon } from "../types/Pokemon";
import { fetchSinglePokemon } from "../utils/apiCalls";
import style from "../styles/pokemon.module.css";
import PokemonPageHeader from "../components/PokemonPageHeader";
import PokemonDetails from "../components/PokemonDetails";

export default function PokemonPage({ pokemon }: { pokemon?: Pokemon }) {
  if (!pokemon) return null;
  return (
    <div
      className={style.pokemon_page}
      style={{ background: `var(--${pokemon?.color})` }}
    >
      <PokemonPageHeader pokemon={pokemon} />
      <PokemonDetails pokemon={pokemon} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let { pokemonId } = context.query;
  if (!pokemonId) {
    return {
      props: {
        pokemon: null,
        error: true,
      },
    };
  }
  try {
    const pokemon = await fetchSinglePokemon(+pokemonId);
    return {
      props: {
        pokemon,
        error: false,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      props: {
        pokemon: null,
        error: false,
      },
    };
  }
};
