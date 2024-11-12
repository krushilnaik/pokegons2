import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import PokemonModel from "@/models";

import mongoose from "mongoose";
import Pokemons from "./datasource";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI!);

    console.log("Connected to database successfully");
  } catch (error) {
    console.error(error);
  }
};

connectDB();

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

// @ts-ignore
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req, res) => ({
    req,
    res,
    dataSources: {
      // @ts-ignore
      Pokemon: new Pokemons({ modelOrCollection: PokemonModel }),
    },
  }),
});

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
