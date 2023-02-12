import { useState, useEffect, useRef, use } from "react";
import { GetServerSideProps } from "next";
import HomeHeader from "../components/HomeHeader";
import style from "../styles/index.module.css";
import { fetchPokemon } from "../utils/apiCalls";
import { Pokemon } from "../types/Pokemon";
import PokemonCard from "../components/PokemonCard";
import { usePokemon } from "../utils/usePokemon";
import AnimatedSection from "../components/AnimatedSection";
import Image from "next/image";
import HomeMenu from "../components/HomeMenu";
import { AnimatePresence, motion } from "framer-motion";

export default function Home({
  pokemon: serverPokemon,
  error,
}: {
  pokemon: Pokemon[];
  error: boolean;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isLoading, pokemon, fetchNextPokemon } = usePokemon(serverPokemon);

  const [scrolledToEnd, setScrolledToEnd] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  function openMenuHandler() {
    setIsMenuOpen(!isMenuOpen);
  }

  useEffect(() => {
    async function fetchOnScrollEnd(this: HTMLDivElement) {
      let { scrollHeight, scrollTop, clientHeight } = this;
      if (scrollHeight - scrollTop === clientHeight) {
        setScrolledToEnd(true);
        setTimeout(() => {
          setScrolledToEnd(false);
        }, 1000);
      } else {
        setScrolledToEnd(false);
      }
    }
    container?.current?.addEventListener("scroll", fetchOnScrollEnd);

    return () =>
      container?.current?.addEventListener("scroll", fetchOnScrollEnd);
  }, []);

  useEffect(() => {
    if (scrolledToEnd && !isLoading) {
      fetchNextPokemon();
    }
  }, [scrolledToEnd]);

  return (
    <>
      <div ref={container} className={style.home}>
        <HomeHeader onOpenMenu={openMenuHandler} />
        <div className={style.home__pokemon_cards}>
          {pokemon.map((pokemon) => (
            <AnimatedSection key={`anim_${pokemon.id}`}>
              <PokemonCard
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.image}
                types={pokemon.types}
                color={pokemon.color}
                key={pokemon.id}
              />
            </AnimatedSection>
          ))}
        </div>

        {isLoading && (
          <div
            style={{
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src="/images/pokeball-bounce.gif"
              width={60}
              height={42}
              alt="data loading image"
            />
          </div>
        )}
      </div>
      <AnimatePresence>
        {isMenuOpen && <HomeMenu onClose={() => setIsMenuOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let pokemon: Pokemon[] = [];
  try {
    pokemon = await fetchPokemon();
  } catch (e) {
    console.log(e);
    return {
      props: {
        pokemon: [],
        error: true,
      },
    };
  }

  return {
    props: {
      pokemon,
      error: false,
    },
  };
};
