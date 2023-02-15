import Link from "next/link";
import { Pokemon } from "../../types/Pokemon";

export default function PokemonEvolutions({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div>
      <div style={{ overflowX: "auto", display: "flex" }}>
        {pokemon.evolutions.map((p) => {
          return (
            <Link
              href={`/${p.id}`}
              style={{ textDecoration: "none" }}
              key={p.id}
            >
              <div
                style={{
                  height: "200px",
                  width: "200px",
                  minWidth: "200px",
                  minHeight: "200px",
                  background: `var(--${pokemon.color}`,
                  marginRight: "10px",
                  borderRadius: "7px",
                  textAlign: "center",
                  padding: "10px",
                }}
              >
                <img src={p.image} style={{ height: "120px", width: "auto" }} />
                <span
                  style={{
                    color: "white",
                    fontWeight: "900",
                    fontSize: "1.4rem",
                    textTransform: "capitalize",
                    textDecoration: "none",
                  }}
                >
                  {p.name}
                </span>
                <p
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    margin: "0px",
                  }}
                >
                  #{p.id}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
