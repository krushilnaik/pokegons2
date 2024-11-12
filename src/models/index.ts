import mongoose, { Schema } from "mongoose";

const effectiveness = {
  multiplier: { type: Number },
  type: { type: String },
};

const path = {
  color: { type: String },
  points: { type: String },
};

const pokemonSchema = new Schema(
  {
    id: { type: String, unique: true, required: true },
    name: { type: String },
    image: { type: String },
    variant: { type: String },
    number: { type: Number },
    types: [String],
    evolutions: [{ type: String, ref: "Pokemon" }],
    evolutionOrder: { type: Number },
    forms: [{ type: String, ref: "Pokemon" }],
    paths: [path],
    resistances: [effectiveness],
    weaknesses: [effectiveness],
    immunities: [effectiveness],
  },
  { collection: "Pokemon" }
);

pokemonSchema.virtual("evolutionDetails", {
  ref: "Pokemon",
  localField: "evolutions",
  foreignField: "id",
});

pokemonSchema.virtual("formDetails", {
  ref: "Pokemon",
  localField: "forms",
  foreignField: "id",
});

pokemonSchema.set("toObject", { virtuals: true });
pokemonSchema.set("toJSON", { virtuals: true });

export default mongoose.models.Pokemon || mongoose.model("Pokemon", pokemonSchema);
