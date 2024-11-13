import { useTransition } from "react";
import useLocalStorageState from "use-local-storage-state";

export function usePokemon() {
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useLocalStorageState<string>("pokegons-state");

  const setPokemon = (search: string) => {
    startTransition(() => {
      setSearch(search);
    });
  };

  return { search, setPokemon, isPending };
}
