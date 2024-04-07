import React, { useState } from "react";

export default function ImageUpload({
  title,
  onImageSelected,
}: {
  title: string;
  onImageSelected: (img: File) => void;
}) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      setSelectedImage(img);
      onImageSelected(img); // Pass the image file up to the parent component
    }
  };

  return (
    <div className="flex flex-col w-full gap-2">
     <div className="text-xl font-bold">{title}</div>
      <input
        onChange={handleImageChange}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"                
        type="file"
      />
      <div className="flex w-full justify-center items-center">
        {selectedImage && (
          <img
            className="max-h-[200px]"
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
          />
        )}
      </div>
    </div>
  );
}
