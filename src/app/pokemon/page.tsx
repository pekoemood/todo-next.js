import { DivideIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

type Pokemons = {
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
};

type Pokemon = {
  id: number;
  name: string;
  sprites: { other: { "official-artwork": { front_default: string } } };
};

export default async function Pokemon() {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon`);
  const pokemons: Pokemons = await res.json();

  const detailPokemons: Pokemon[] = await Promise.all(
    pokemons.results.map(async (p) => {
      const res = await fetch(p.url);
      const data = await res.json();
      return data;
    }),
  );

  return (
    <div className="mx-auto my-16 max-w-7xl px-8">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900">
        Pokemon Library
      </h2>
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        {detailPokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <div className="group relative overflow-hidden rounded-lg bg-gray-100 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600">
              <Image
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt="ポケモン画像"
                width={500}
                height={500}
                className=" pointer-events-none rounded-lg object-cover outline -outline-offset-1 outline-black/5 group-hover:opacity-75"
              />
            </div>
            <p className="font-semibold ">{pokemon.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
