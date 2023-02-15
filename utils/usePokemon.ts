import { useState, useEffect } from "react";
import { fetchPokemon } from "../utils/apiCalls";
import { Pokemon } from "../types/Pokemon";

export function usePokemon(initialPokemon: Pokemon[]) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [pokemon, setPokemon] = useState(initialPokemon);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const increment = 20;

  async function fetchNextPokemon() {
    if (isFetching) return; //prevent from fetching more then onece at a time
    setIsFetching(true);
    try {
      setIsLoading(true);
      let nextOffset = offset + increment;
      setOffset(nextOffset);
      const newPokemon = await fetchPokemon(undefined, nextOffset);
      setTimeout(() => {
        setIsLoading(false);
        setPokemon([...pokemon, ...newPokemon]);
      }, 2000);
      setIsFetching(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }

  return {
    pokemon,
    setPokemon,
    fetchNextPokemon,
    isLoading,
    limit,
  };
}
