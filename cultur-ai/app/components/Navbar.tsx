import React from "react";
import { AppSection } from "../page";

type NavbarProps = {
    activeAppSection: AppSection,
    setActiveAppSection: (appSection: AppSection) => void
}
export default function Navbar({
    activeAppSection,
    setActiveAppSection
}:NavbarProps) {
  return (
    <div className="relative bg-gray-50  w-screen h-full pattern">
      <nav className="z-20 flex shrink-0 grow-0 justify-around gap-4 border-t border-gray-200 bg-white/50 p-2.5 shadow-lg backdrop-blur-lg dark:border-slate-600/60 dark:bg-slate-800/50 fixed top-2/4 -translate-y-2/4 right-6 min-h-[auto] w-[40px] flex-col rounded-lg border">
        <div onClick={() => setActiveAppSection(AppSection.HOME)} className="flex aspect-square min-h-[32px] w-13 flex-col items-center justify-center gap-1 rounded-md p-1.5  text-indigo-600  dark:text-sky-50">
          <svg
            width="256px"
            height="256px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M12 15L12 18"
                stroke={`${activeAppSection === AppSection.HOME ? "#9333ea" : "#ffffff" }`}
                stroke-width="1.5"
                stroke-linecap="round"
              ></path>{" "}
              <path
                d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274"
                stroke={`${activeAppSection === AppSection.HOME ? "#9333ea" : "#ffffff" }`}
                stroke-width="1.5"
                stroke-linecap="round"
              ></path>{" "}
            </g>
          </svg>
        </div>
        <div onClick={() => setActiveAppSection(AppSection.MAP)} className="flex aspect-square min-h-[32px] w-13 flex-col items-center justify-center gap-1 rounded-md p-1.5  text-indigo-600  dark:text-sky-50">
          <svg
            width="256px"
            height="256px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M12 6H12.01M9 20L3 17V4L5 5M9 20L15 17M9 20V14M15 17L21 20V7L19 6M15 17V14M15 6.2C15 7.96731 13.5 9.4 12 11C10.5 9.4 9 7.96731 9 6.2C9 4.43269 10.3431 3 12 3C13.6569 3 15 4.43269 15 6.2Z"
                stroke={`${activeAppSection === AppSection.MAP ? "#9333ea" : "#ffffff" }`}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
            </g>
          </svg>
        </div>
        <div onClick={() => setActiveAppSection(AppSection.AR)} className="flex aspect-square min-h-[32px] w-13 flex-col items-center justify-center gap-1 rounded-md p-1.5  text-indigo-600  dark:text-sky-50">
          <svg
            width="256px"
            height="256px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#000000"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M7 9.5L12 12M7 9.5V14.5L12 17M7 9.5L12 7L17 9.5M12 12L17 9.5M12 12V17M17 9.5V14.5L12 17M8 4H6C4.89543 4 4 4.89543 4 6V8M8 20H6C4.89543 20 4 19.1046 4 18V16M16 4H18C19.1046 4 20 4.89543 20 6V8M16 20H18C19.1046 20 20 19.1046 20 18V16"
                stroke={`${activeAppSection === AppSection.AR ? "#9333ea" : "#ffffff" }`}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
            </g>
          </svg>
        </div>
        <div onClick={() => setActiveAppSection(AppSection.RIDDLE)} className="flex aspect-square min-h-[32px] w-13 flex-col items-center justify-center gap-1 rounded-md p-1.5  text-indigo-600  dark:text-sky-50">
          <svg
            width="256px"
            height="256px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke={`${activeAppSection === AppSection.RIDDLE ? "#9333ea" : "#ffffff" }`}
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.3636 5.25C12.2716 5.25 11.3864 6.13525 11.3864 7.22727V7.97727L7.97727 7.97727L7.97727 11.3864H7.22727C6.13526 11.3864 5.25 12.2716 5.25 13.3636C5.25 14.4557 6.13526 15.3409 7.22727 15.3409H7.97727L7.97727 18.75L18.75 18.75V16.7598C17.1901 16.4169 16.0227 15.0266 16.0227 13.3636C16.0227 11.7007 17.1901 10.3104 18.75 9.96745V7.97727L15.3409 7.97727V7.22727C15.3409 6.13526 14.4557 5.25 13.3636 5.25ZM9.96745 6.47727C10.3104 4.91733 11.7007 3.75 13.3636 3.75C15.0266 3.75 16.4169 4.91733 16.7598 6.47727L20.25 6.47727V11.3864L19.5 11.3864C18.408 11.3864 17.5227 12.2716 17.5227 13.3636C17.5227 14.4557 18.408 15.3409 19.5 15.3409H20.25V20.25L6.47727 20.25L6.47727 16.7598C4.91733 16.4169 3.75 15.0266 3.75 13.3636C3.75 11.7007 4.91733 10.3104 6.47727 9.96745L6.47727 6.47727L9.96745 6.47727Z"
                fill="#ffffff"
              ></path>{" "}
            </g>
          </svg>
        </div>
      </nav>
    </div>
  );
}
