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
  const pokemons: Pokemons = await fetch(
    `https://pokeapi.co/api/v2/pokemon`,
  ).then((res) => res.json());

  const detailPokemons: Pokemon[] = await Promise.all(
    pokemons.results.map(async (p) => {
      const data = await fetch(p.url).then((res) => res.json());
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
        className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        {detailPokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <div
              tabIndex={0}
              className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-lg focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
            >
              <div className="px-4 py-5 sm:px-6">
                <p className="text-center text-xl font-semibold text-gray-500">
                  {pokemon.name}
                </p>
              </div>
              <Image
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt="ポケモン画像"
                width={500}
                height={500}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
