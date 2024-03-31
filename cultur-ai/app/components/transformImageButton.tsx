"use client"

import React, { useState } from 'react';
import transformImage from "../api/transformImage";

type TransformImageButtonProps = {
    style: string,
    image: File
};

export default function TransformImageButton({style, image}: TransformImageButtonProps) {
    const [transformedImage, setTransformedImage] = useState<string | null>(null);

    const handleClick = async () => {
        if (image) {
            let formData = new FormData();
            formData.append('image', image); // 'image' is a File object
            formData.append('style', style); // 'style' is a string
    
            try {
                const response = await transformImage(formData);
                setTransformedImage(`data:image/jpeg;base64,${response}`);

            } catch (error) {
                console.error('Error during image transformation', error);
            }
        }
    };
  
    return (
        <div>
            <button
                onClick={handleClick} 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Transform Image
            </button>
            {transformedImage && <img src={transformedImage} alt="Transformed" />}
        </div>
    );
  }
  