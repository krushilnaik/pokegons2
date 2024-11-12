import PokemonModel from "@/models";
import { Pokemon } from "@/types";
import { MongoDataSource } from "apollo-datasource-mongodb";

export default class PokemonDocument extends MongoDataSource<Pokemon> {
  async getPokemonByName(name: string) {
    try {
      return await PokemonModel.findOne({ name }).populate("evolutionDetails formDetails");
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch pokemon");
    }
  }

  async getPokemonByID(id: string) {
    try {
      return await PokemonModel.findOne({ id }).populate("evolutionDetails formDetails");
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch pokemon");
    }
  }

  async searchPokemon(search: string) {
    let filter: any = {};
    const tokens = search.split(" ");

    if (tokens.length > 1) {
      filter["variant"] = { $regex: `(${tokens.slice(0, -1).join("[\\s:-_()]*")})|(base)`, $options: "i" };
      filter["name"] = {
        $regex: `^(${tokens.slice(-1).join(".{0,1}\\s*")})|(${tokens.join(".{0,1}\\s*")})$`,
        $options: "i",
      };
    } else {
      filter["variant"] = "Base";
      filter["name"] = { $regex: `^${search.replace(/ /g, ".{0,1}\\s*")}$`, $options: "i" };
    }

    // console.log(filter);

    const response = await PokemonModel.find(filter).populate("evolutionDetails formDetails");

    // console.log(response[0]);

    if (response.length > 1) {
      return response.find((p) => p.variant != "Base");
    } else {
      return response[0];
    }
  }

  async getAllPokemon() {
    try {
      return await PokemonModel.find().populate("evolutionDetails formDetails");
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch pokemon");
    }
  }
}
