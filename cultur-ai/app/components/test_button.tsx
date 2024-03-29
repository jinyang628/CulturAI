"use client"

import testAPI from "../api/test";

export default function Button() {

    const handleClick = () => {
      // Define what you want to happen on click
      testAPI();
    };
  
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <button
          onClick={handleClick} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"/>
      </main>
    );
  }
  