"use client"

import generateRiddle from "../api/generateRiddle";

export default function GenerateRiddleButton() {

    const handleClick = () => {
      generateRiddle();
    };
  
    return (
      <button
        onClick={handleClick} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        />
    );
  }
  