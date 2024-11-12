import mongoose, { Schema } from "mongoose";

const effectiveness = {
  multiplier: { type: Number },
  type: { type: String },
};

const svg_path = {
  color: { type: String },
  points: { type: String },
};

const pokemonSchema = new Schema(
  {
    id: { type: String, unique: true, required: true },
    name: String,
    image: String,
    variant: String,
    number: Number,
    types: [String],
    evolutions: [{ type: String, ref: "Pokemon" }],
    evolutionOrder: Number,
    forms: [{ type: String, ref: "Pokemon" }],
    paths: [svg_path],
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
