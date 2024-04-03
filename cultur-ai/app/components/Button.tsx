import { ButtonType } from "@/app/enums/ButtonType";
import React from "react";

type ButtonProps = {
  label: string;
  handleClick: () => void;
  buttonType: ButtonType;
  disabled?: boolean;
};
export default function Button({
  label,
  handleClick,
  buttonType,
  disabled,
}: ButtonProps) {
  if (buttonType === ButtonType.RIDDLE_BUTTON) {
    return (
      <button
        disabled={disabled}
        onClick={handleClick}
        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          {label}
        </span>
      </button>
    );
  }
  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className="relative rounded inline-block px-4 py-2 font-medium group"
    >
      <span className={`absolute rounded inset-0 w-full h-full transition duration-00 ease-out transform translate-x-1 translate-y-1 ${disabled ? "" : "bg-green-200 group-hover:-translate-x-0 group-hover:-translate-y-0"} `}></span>
      <span className={`absolute rounded inset-0 w-full h-full ${disabled ? " bg-gray-300 " : "bg-white group-hover:bg-black "} border-2 border-black group-hover:bg-green-200`}></span>
      <span className={`relative ${disabled ? "text-gray-400" : "text-black"}`}>
        {label}
      </span>
    </button>
  );
}
