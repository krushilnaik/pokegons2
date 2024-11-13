import PokemonDocument from "./datasource";

interface Context {
  dataSources: {
    Pokemon: PokemonDocument;
  };
}

const resolvers = {
  Query: {
    pokemon: async (_: any, args: { search: string }, { dataSources }: Context) => {
      try {
        return await dataSources.Pokemon.searchPokemon(args.search);
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch pokemon");
      }
    },

    pokemonByID: async (_: any, args: { id: string }, { dataSources }: Context) => {
      try {
        return await dataSources.Pokemon.getPokemonByID(args.id);
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch pokemon");
      }
    },

    pokemons: async (_: any, _args: {}, { dataSources }: Context) => {
      try {
        return await dataSources.Pokemon.getAllPokemon();
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch pokemon");
      }
    },
  },
  Pokemon: {
    evolutions: async (parent: any) => {
      if (!parent.evolutionDetails) {
        return [];
      }

      return parent.evolutionDetails;
    },

    forms: async (parent: any) => {
      if (!parent.formDetails) {
        return [];
      }

      return parent.formDetails;
    },

    nextPokemon: async (parent: any) => {
      if (!parent.nextDetails) {
        return null;
      }

      return parent.nextDetails;
    },

    prevPokemon: async (parent: any) => {
      if (!parent.prevDetails) {
        return null;
      }

      return parent.prevDetails;
    },
  },
};

export default resolvers;
