import React, { useState } from "react";

export default function ImageUpload({
  onImageSelected,
}: {
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
    // <div>
    //   <input type="file" accept="image/*" onChange={handleImageChange} />
    //   {selectedImage && (
    //     <img
    //       src={URL.createObjectURL(selectedImage)}
    //       alt="Selected"
    //       style={{ height: "200px" }}
    //     />
    //   )}
    // </div>
    <div>
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        form="file_input"
      >
        Upload file
      </label>
      <input
        onChange={handleImageChange}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="file_input"
        type="file"
      />
      {selectedImage && (
        <img
          src={URL.createObjectURL(selectedImage)}
          alt="Selected"
          style={{ height: "200px" }}
        />
      )}
    </div>
  );
}
