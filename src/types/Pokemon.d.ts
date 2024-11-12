import { Effect, Type } from ".";
import { Polygon } from "./Polygon";

export interface Pokemon {
  name: string;
  variant: string;
  types: Type[];
  id: string;
  number: number;
  image: string;
  evolutionOrder: number;
  forms: Pokemon[];
  evolutions: Pokemon[];
  weaknesses: Effect[];
  resistances: Effect[];
  immunities: Effect[];
  paths: Polygon[];
}
