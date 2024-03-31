"use client"

import getHint from "../api/getHint";
import { AttractionsEnum } from "../types/attractions";

type GetHintButtonProps = {
    attraction: AttractionsEnum
};

export default function GetHintButton({attraction}: GetHintButtonProps) {

    const handleClick = () => {
      getHint(attraction=attraction);
    };
  
    return (
        <button
          onClick={handleClick} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        />
    );
  }
  