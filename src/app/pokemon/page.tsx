import Image from "next/image";

type Pokemon = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: { type: { name: string } }[];
};

export default async function Pokemon() {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/ditto`);
  const pokemon: Pokemon = await res.json();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto rounded-lg border border-gray-400 p-4">
        <p className="text-center font-semibold">{pokemon.name}</p>
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          width={150}
          height={150}
          className="mx-auto"
        />
      </div>
    </main>
  );
}
