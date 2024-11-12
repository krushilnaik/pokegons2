const typeDefs = `#graphql
  type PokemonEffectiveness {
    multiplier: Float!
    type: String!
  }

  type PokemonPath {
    color: String
    points: String
  }

  type Pokemon {
    evolutionOrder: Int!
    evolutions: [Pokemon]
    forms: [Pokemon]
    id: String!
    image: String!
    immunities: [PokemonEffectiveness]
    name: String!
    number: Int!
    paths: [PokemonPath]!
    resistances: [PokemonEffectiveness]
    types: [String]!
    variant: String!
    weaknesses: [PokemonEffectiveness]
  }

  type Query {
    pokemon(search: String!): Pokemon
    pokemonByID(id: String!): Pokemon
    pokemons: [Pokemon]
  }
`;

export default typeDefs;
