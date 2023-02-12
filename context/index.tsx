import { createContext, useState } from "react";
import { Pokemon } from "../types/Pokemon";

interface IInitaislState {
  pokemon: Pokemon[];
  setPokemon: (arr: Pokemon[]) => void;
  isMenuOpen: boolean;
}

const initialState: IInitaislState = {
  pokemon: [],
  setPokemon: () => {},
  isMenuOpen: false,
};
const pokemonContext = createContext(initialState);

export default function PokemonContext() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <pokemonContext.Provider
      value={{
        pokemon,
        setPokemon,
        isMenuOpen,
      }}
    ></pokemonContext.Provider>
  );
}
