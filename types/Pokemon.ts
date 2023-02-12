export type Pokemon = {
  id: number;
  name: string;
  stats: { name: string; base_stat: number }[];
  details: string;
  weight: number;
  height: number;
  abilities: { name: string }[];
  base_experience: number;
  moves: { move: string }[];
  image: string;
  types: { name: string }[];
  color: string;
  base_happiness: number;
  evolutions: Array<{
    id: number;
    image: string;
    name: string;
  }>;
};
