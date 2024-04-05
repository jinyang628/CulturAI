import React, { useState } from "react";
import Button from "../Button";
import generateRiddle from "@/app/api/generateRiddle";
import getHint from "@/app/api/getHint";
import transformImage from "@/app/api/transformImage";
import validateImage from "@/app/api/validateImage";
import { ButtonType } from "@/app/enums/ButtonType";
import { AttractionsEnum } from "@/app/types/attractions";
import ImageUpload from "../imageUpload";

export default function Riddle() {
  const [riddle, setRiddle] = useState<string>("");
  const [riddleHint, setRiddleHint] = useState<string>("");
  const [uploadedValidationImage, setUploadedValidationImage] = useState(null);
  const [uploadedTransformationImage, setUploadedTransformationImage] =
    useState(null);

  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const [textForTransformation, setTextForTransformation] =
    useState<string>("");

  const handleGenerateRiddle = async () => {
    const newRiddle = await generateRiddle();
    setRiddle(newRiddle.data);
  };

  const handleGenerateRiddleHint = async () => {
    const riddleHint = await getHint(
      AttractionsEnum.BURRELL_SCHOOL_VINEYARD_AND_WINERY
    );
    setRiddleHint(riddleHint.data);
  };

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

  type TransformImageButtonProps = {
    style: string;
    image: File;
  };

  const handleTransformImage = async ({
    style,
    image,
  }: TransformImageButtonProps) => {
    if (image) {
      let formData = new FormData();
      formData.append("image", image); // 'image' is a File object
      formData.append("style", style); // 'style' is a string

      try {
        const response = await transformImage(formData);
        setTransformedImage(`data:image/jpeg;base64,${response}`);
        console.log(response);
      } catch (error) {
        console.error("Error during image transformation", error);
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="text-3xl font-bold">Riddles</div>
      <div className="justify-center items-center w-full flex flex-col">
        <div className="w-full text-left">
          {riddle && (
            <div className="chat chat-start animate-fadeIn">
              <div className="chat-bubble">{riddle}</div>
            </div>
          )}
          {riddleHint && (
            <div className="chat chat-end animate-fadeIn">
              <div className="chat-bubble">{riddleHint}</div>
            </div>
          )}
        </div>
        <div>
          
        </div>
        <Button
          handleClick={handleGenerateRiddle}
          buttonType={ButtonType.RIDDLE_BUTTON}
          label="Generate Riddle"
        />

        <Button
          handleClick={handleGenerateRiddleHint}
          buttonType={ButtonType.RIDDLE_BUTTON}
          label="Get Hint"
        />
        <div className="w-[70%] flex justify-center items-center flex-col gap-5 mt-8">
          <ImageUpload
            title="Upload Image for validation"
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
            title="Upload Image to transform"
            onImageSelected={(imageFile: any) => {
              setUploadedTransformationImage(imageFile);
            }}
          />
          <input
            type="text"
            value={textForTransformation}
            onChange={(event) =>
              setTextForTransformation(event.currentTarget.value)
            }
            className="w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter description"
          />

          {uploadedTransformationImage && (
            <Button
              handleClick={() =>
                handleTransformImage({
                  style: "impressionism",
                  image: uploadedTransformationImage,
                })
              }
              disabled={textForTransformation === ""}
              buttonType={ButtonType.IMAGE_ACTION_BUTTON}
              label="Transform Image!"
            />
          )}

          {transformedImage && <img src={transformedImage} alt="Transformed" />}
        </div>
      </div>
    </div>
  );
}
