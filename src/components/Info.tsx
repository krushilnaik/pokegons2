import { typeColors } from "@/constants";
import { Pokemon } from "@/types";
import { QueryRef, useReadQuery } from "@apollo/client";
import Image from "next/image";

interface Response {
  pokemon: Pokemon;
}

interface Props {
  queryRef: QueryRef<Response>;
}

export default function Info({ queryRef }: Props) {
  const { data } = useReadQuery(queryRef);

  return (
    <section className="flex flex-col items-center gap-3">
      <span>#{data.pokemon.id}</span>
      <div className="w-64 h-64 bg-slate-200/5">
        <Image width={256} height={256} src={`/pokemon/${data.pokemon.id}.png`} alt={data.pokemon.name} />
      </div>
      <ul className="flex gap-3">
        {data.pokemon.types.map((type) => (
          <li key={`pokemon-type-${type}`} className="rounded-full" style={{ backgroundColor: typeColors[type] }}>
            <Image
              width={35}
              height={35}
              src={`/icons/${type.toLowerCase()}.svg`}
              className={`relative p-2 z-30 w-10 h-10`}
              alt={type}
            />
          </li>
        ))}
      </ul>
      <h1>{data.pokemon.name}</h1>
      <h2>Species</h2>
    </section>
  );
}