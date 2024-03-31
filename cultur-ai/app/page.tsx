"use client"

import GenerateRiddleButton from "./components/generateRiddleButton";
import GetHintButton from "./components/getHintButton";
import ValidateImageButton from "./components/validateImageButton";
import { AttractionsEnum } from "./types/attractions";
import testImage from "./images/test_image.jpg";
import { SetStateAction, useState } from "react";
import ImageUpload from "./components/imageUpload";
import TransformImageButton from "./components/transformImageButton";

export default function Home() {

  const [uploadedValidationImage, setUploadedValidationImage] = useState(null);
  const [uploadedTransformationImage, setUploadedTransformationImage] = useState(null);

  const handleValidationImageSelected = (imageFile: any) => {
      setUploadedValidationImage(imageFile);
  };

  const handleTransformationImageSelected = (imageFile: any) => {
      setUploadedTransformationImage(imageFile);
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <GenerateRiddleButton/>
      <GetHintButton attraction={AttractionsEnum.BURRELL_SCHOOL_VINEYARD_AND_WINERY} />

      <ImageUpload onImageSelected={handleValidationImageSelected} />
      {uploadedValidationImage && <ValidateImageButton attraction={AttractionsEnum.BURRELL_SCHOOL_VINEYARD_AND_WINERY} image={uploadedValidationImage} />}
      
      <ImageUpload onImageSelected={handleTransformationImageSelected} />
      {uploadedTransformationImage && <TransformImageButton style="impressionism" image={uploadedTransformationImage} />}
    </main>
  );
}
