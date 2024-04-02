"use client";

import validateImage from "../api/validateImage";
import { AttractionsEnum } from "../types/attractions";

type ValidateImageButtonProps = {
  attraction: AttractionsEnum;
  image: File;
};

export default function ValidateImageButton({
  attraction,
  image,
}: ValidateImageButtonProps) {
  const handleClick = async () => {
    if (image) {
      let formData = new FormData();
      formData.append("image", image); // 'image' is a File object
      formData.append("attraction", attraction); // 'attraction' is a string

      try {
        validateImage(formData);
      } catch (error) {
        console.error("Error during image validation", error);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className="relative rounded inline-block px-4 py-2 font-medium group"
    >
      <span className="absolute rounded inset-0 w-full h-full transition duration-00 ease-out transform translate-x-1 translate-y-1 bg-green-200 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
      <span className="absolute rounded inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black focus:bg-red"></span>
      <span className="relative text-black group-hover:text-orange-300">
        Validate Image
      </span>
    </button>
  );
}
