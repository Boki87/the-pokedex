import { useState, useEffect } from "react";
import { Pokemon } from "../types/Pokemon";

export function useFavorites() {
  const [favoritePokemon, setFavoritePokemon] = useState<Pokemon[]>([]);

  function addPokemon(pokemon: Pokemon) {
    try {
      const newPokemon = [...favoritePokemon, pokemon];
      window.localStorage.setItem("fav_pokemon", JSON.stringify(newPokemon));
      setFavoritePokemon(newPokemon);
    } catch (e) {}
  }

  function removePokemon(id: number) {
    try {
      const newPokemon = favoritePokemon.filter((p) => p.id !== id);
      window.localStorage.setItem("fav_pokemon", JSON.stringify(newPokemon));
      setFavoritePokemon(newPokemon);
    } catch (e) {}
  }

  useEffect(() => {
    try {
      const storedPokemon = window.localStorage.getItem("fav_pokemon");

      const pokemon = storedPokemon ? JSON.parse(storedPokemon) : [];

      setFavoritePokemon(pokemon);
    } catch (e) {
      setFavoritePokemon([]);
    }
  }, []);

  return { favoritePokemon, addPokemon, removePokemon };
}
