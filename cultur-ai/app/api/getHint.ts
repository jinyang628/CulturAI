
import axios from "axios";
import { AttractionsEnum } from "../types/attractions";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function getHint(attraction: AttractionsEnum) {
    const response= await axios.post( 
        `${API_URL}/api/get_hint`,
        {
            name: attraction,
        }
    );
    console.log(response);
    return response
}