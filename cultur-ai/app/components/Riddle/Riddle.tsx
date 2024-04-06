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
  const [isLoadingRiddle, setIsLoadingRiddle] = useState<boolean>(false);
  const [isLoadingRiddleHint, setIsLoadingRiddleHint] =
    useState<boolean>(false);

  const handleGenerateRiddle = async () => {
    setIsLoadingRiddle(true);
    const newRiddle = await generateRiddle();
    if (newRiddle) {
      setIsLoadingRiddle(false);
    }
    setRiddle(newRiddle.data);
  };

  const handleGenerateRiddleHint = async () => {
    setIsLoadingRiddleHint(true);
    const riddleHint = await getHint(AttractionsEnum.HEARST_CASTLE);
    if (riddleHint) {
      setIsLoadingRiddleHint(false);
    }
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
    <div className="w-full flex flex-col gap-5 ">
      <div className="text-3xl font-bold">Riddle</div>
      <div className="justify-center items-center w-full flex flex-col gap-4">
        <div className="w-full text-left border-[0.5px] py-8 px-2 rounded-lg ">
          {!riddle && !isLoadingRiddle && (
            <div className="chat chat-start animate-fadeIn">
              <div className="chat-bubble">
                {'Click "Generate Riddle" to start '}
              </div>
            </div>
          )}
          {isLoadingRiddle && (
            <div className="chat chat-start animate-pulse">
              <div className="chat-bubble">Loading Riddle..</div>
            </div>
          )}
          {riddle && (
            <div className="chat chat-start animate-fadeIn">
              <div className="chat-bubble">{riddle}</div>
            </div>
          )}
          {isLoadingRiddleHint && (
            <div className="chat chat-start animate-pulse">
              <div className="chat-bubble">Loading Hint..</div>
            </div>
          )}
          {riddleHint && (
            <div className="chat chat-start animate-fadeIn">
              <div className="chat-bubble">{riddleHint}</div>
            </div>
          )}
        </div>

        {isLoadingRiddle ? (
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <Button
            handleClick={handleGenerateRiddle}
            buttonType={ButtonType.RIDDLE_BUTTON}
            label="Generate Riddle"
          />
        )}

        {isLoadingRiddleHint ? (
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          riddle && (
            <Button
              handleClick={handleGenerateRiddleHint}
              buttonType={ButtonType.RIDDLE_BUTTON}
              label="Get Hint"
            />
          )
        )}
        <div className="w-full flex justify-center items-center flex-col gap-5 mt-8">
          <ImageUpload
            title="Upload Image for validation"
            onImageSelected={(imageFile: any) => {
              setUploadedValidationImage(imageFile);
            }}
          />

          {uploadedValidationImage && (
            <button
              onClick={() =>
                handleValidateImage(
                  uploadedValidationImage,
                  AttractionsEnum.HEARST_CASTLE
                )
              }
              className="btn btn-primary text-white"
            >
              Validate Image
            </button>
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
            <button
              onClick={() =>
                handleTransformImage({
                  style: textForTransformation,
                  image: uploadedTransformationImage,
                })
              }
              className="btn btn-primary text-white"
              disabled={textForTransformation === ""}
            >
              Transform Image!
            </button>
          )}

          {transformedImage && <img src={transformedImage} alt="Transformed" />}
        </div>
      </div>
    </div>
  );
}
