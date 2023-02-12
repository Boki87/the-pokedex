import { Pokemon } from "../../types/Pokemon";

export default function PokemonMoves({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {pokemon.moves.map((move, i) => {
        if (i < 20) {
          return (
            <div
              style={{
                minWidth: "70px",
                height: "30px",
                padding: "0px 5px",
                borderRadius: "5px",
                border: "none",
                background: "var(--color-gray)",
                color: "var(--text-black-light)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "3px 5px 3px 0px",
              }}
              key={move.move}
            >
              {move.move}
            </div>
          );
        }
      })}
    </div>
  );
}
