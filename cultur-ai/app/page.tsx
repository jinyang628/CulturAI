"use client";

import GenerateRiddleButton from "./components/generateRiddleButton";
import GetHintButton from "./components/getHintButton";
import ValidateImageButton from "./components/validateImageButton";
import { AttractionsEnum } from "./types/attractions";
import testImage from "./images/test_image.jpg";
import { SetStateAction, useState } from "react";
import ImageUpload from "./components/imageUpload";
import TransformImageButton from "./components/transformImageButton";
import Button from "./components/Buttons/Button";
import generateRiddle from "./api/generateRiddle";
import { ButtonType } from "./enums/ButtonType";
import getHint from "./api/getHint";
import validateImage from "./api/validateImage";

export default function Home() {
  const [uploadedValidationImage, setUploadedValidationImage] = useState(null);
  const [uploadedTransformationImage, setUploadedTransformationImage] =
    useState(null);

  const handleValidateImage = async (
    image: File,
    attraction: AttractionsEnum
  ) => {
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
    <main className="flex min-h-screen bg-black flex-col items-center justify-between p-8 ">
      <Button
        handleClick={() => generateRiddle()}
        buttonType={ButtonType.RIDDLE_BUTTON}
        label="Generate Riddle"
      />

      <Button
        handleClick={() =>
          getHint(AttractionsEnum.BURRELL_SCHOOL_VINEYARD_AND_WINERY)
        }
        buttonType={ButtonType.RIDDLE_BUTTON}
        label="Get Hint"
      />

      <ImageUpload
        onImageSelected={(imageFile: any) => {
          setUploadedValidationImage(imageFile);
        }}
      />
      {uploadedValidationImage && (
        <Button
          handleClick={() =>
            handleValidateImage(
              uploadedValidationImage,
              AttractionsEnum.BURRELL_SCHOOL_VINEYARD_AND_WINERY
            )
          }
          buttonType={ButtonType.IMAGE_ACTION_BUTTON}
          label="Validate Image"
        />
      )}

      <ImageUpload
        onImageSelected={(imageFile: any) => {
          setUploadedTransformationImage(imageFile);
        }}
      />
      {uploadedTransformationImage && (
        <TransformImageButton
          style="impressionism"
          image={uploadedTransformationImage}
        />
      )}
    </main>
  );
}
