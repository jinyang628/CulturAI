"use client"

import validateImage from "../api/validateImage";
import { AttractionsEnum } from "../types/attractions";

type ValidateImageButtonProps = {
    attraction: AttractionsEnum,
    image: File
};

export default function ValidateImageButton({attraction, image}: ValidateImageButtonProps) {

    const handleClick = async () => {
        if (image) {
            let formData = new FormData();
            formData.append('image', image); // 'image' is a File object
            formData.append('attraction', attraction); // 'attraction' is a string
    
            try {
                validateImage(formData);
            } catch (error) {
                console.error('Error during image validation', error);
            }
        }
    };
  
    return (
      <button
        onClick={handleClick} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        />
    );
  }
  