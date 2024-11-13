"use client";

import { Info } from "@/components";
import { SEARCH_POKEMON } from "@/graphql";
import { usePokemon } from "@/hooks";
import { Pokemon } from "@/types";
import { useBackgroundQuery } from "@apollo/client";
import { Suspense, useDeferredValue } from "react";

interface Response {
  pokemon: Pokemon;
}

export default function Home() {
  const { search } = usePokemon();
  const [queryRef] = useBackgroundQuery<Response>(SEARCH_POKEMON, {
    variables: { search },
  });
  const deferredQuery = useDeferredValue(queryRef);

  return (
    <main className="p-4">
      <Suspense fallback={<div>loading</div>}>
        <Info queryRef={deferredQuery} />
      </Suspense>
    </main>
  );
}
