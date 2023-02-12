import { Pokemon } from "../types/Pokemon";

async function fetchEvolutions(url: string) {
  let res = await fetch(url);
  res = await res.json();
  let evolutionArr = [];
  evolutionArr.push(res.chain.species.url);
  if (res.chain.evolves_to.length > 0) {
    evolutionArr.push(res.chain.evolves_to[0].species.url);

    if (res.chain.evolves_to[0].evolves_to.length > 0) {
      evolutionArr.push(res.chain.evolves_to[0].evolves_to[0].species.url);
    }
  }

  const pokemonEvolutions = await Promise.all(
    evolutionArr.map(async (sprite) => {
      const spriteReq = await fetch(sprite);
      const spriteRes = await spriteReq.json();
      const fetchPokemon = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${spriteRes.name}`
      );

      const fetchPokemonRes = await fetchPokemon.json();
      return {
        name: spriteRes.name,
        image: fetchPokemonRes.sprites.other["official-artwork"].front_default,
        id: fetchPokemonRes.id,
      };
    })
  );

  return pokemonEvolutions;
}

async function fetchPokemonDetails(name: string) {
  const pokemonDetails = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${name}`
  );
  const res = await pokemonDetails.json();
  return res;
}

async function fetchPokemonSpecies(id: number) {
  const pokemonDetails = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`
  );
  const res = await pokemonDetails.json();
  return res;
}

async function fetchSinglePokemon(val: number | string) {
  let species, details;
  if (typeof val === "number") {
    species = await fetchPokemonSpecies(val);
    details = await fetchPokemonDetails(species.name);
  } else if (typeof val === "string") {
    details = await fetchPokemonDetails(val);
    species = await fetchPokemonSpecies(details.id);
  }
  const evolutions = await fetchEvolutions(species.evolution_chain.url);

  const finalData = parseNeededData(species, details, evolutions);
  return finalData;
}

async function fetchPokemon(
  limit: number = 20,
  offset: number = 0
): Promise<Pokemon[]> {
  const pokemonList = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  let pokemonListRes = await pokemonList.json();

  const res: any = [];
  for (let i = 0; i < pokemonListRes.results.length; i++) {
    const pokemon = pokemonListRes.results[i];
    const details = await fetchPokemonDetails(pokemon.name);
    const species = await fetchPokemonSpecies(details.id);

    const neededData = parseNeededData(species, details);
    res.push(neededData);
  }
  return res;
}

export { fetchPokemon, fetchPokemonDetails, fetchSinglePokemon };

///utility functions

function parseNeededData(species: any, details: any, evolutions?: any) {
  const color = species.color.name;
  //stats
  const stats = details.stats.map(function (s: {
    base_stat: number;
    stat: { name: string };
  }) {
    return {
      base_stat: s.base_stat,
      name: s.stat.name,
    };
  });

  //abilities
  const abilities = details.abilities.map(function (a: {
    ability: { name: string };
  }) {
    return {
      name: a.ability.name,
    };
  });

  //moves
  const moves = details.moves.map(function (m: { move: { name: string } }) {
    return {
      move: m.move.name,
    };
  });

  //types
  const types = details.types.map(function (t: { type: { name: string } }) {
    return {
      name: t.type.name,
    };
  });

  const pokemonDetails = {
    id: details.id,
    image: details.sprites.other["official-artwork"]["front_default"],
    name: details.name,
    details: species.flavor_text_entries[0]?.flavor_text,
    weight: details.weight,
    height: details.height,
    base_experience: details.base_experience,
    base_happiness: species.base_happiness,
    color,
    stats,
    abilities,
    moves,
    types,
    evolutions: evolutions || [],
  };

  return pokemonDetails;
}
