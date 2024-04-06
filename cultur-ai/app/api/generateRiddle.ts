
import axios from "axios";
import { AttractionsEnum } from "../types/attractions";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getRandomEnumValue<T extends object>(anEnum: T): T[keyof T] {
    const enumValues = (Object.keys(anEnum) as Array<keyof T>)
      .map(key => anEnum[key])
      .filter(value => typeof value === 'string') as T[keyof T][];
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    return enumValues[randomIndex];
  }

export default async function generateRiddle() {
    const randomAttraction = AttractionsEnum.HEARST_CASTLE;
    const response = await axios.post( 
        `${API_URL}/api/generate_riddle`,
        {
            name: randomAttraction,
        }
    );
    console.log(response)
    return response
}