"use client"

import generateRiddle from "../api/generateRiddle";

export default function GenerateRiddleButton() {

    const handleClick = () => {
      // Define what you want to happen on click
      generateRiddle();
    };
  
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <button
          onClick={handleClick} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"/>
      </main>
    );
  }
  