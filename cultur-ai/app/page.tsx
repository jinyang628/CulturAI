"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import Riddle from "./components/Riddle/Riddle";
import AR from "./components/AR/AR";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import MapScreen from "./components/MapScreen/MapScreen";
import Header from "./components/Header";

export enum AppSection {
  HOME = "HOME",
  MAP = "MAP",
  AR = "AR",
  RIDDLE = "RIDDLE",
}

export default function Home() {
  const [activeAppSection, setActiveAppSection] = useState<AppSection>(
    AppSection.HOME
  );
  return (
    <div className="flex w-full bg-black flex-col items-center justify-center h-full">
      <Header />
      <div className="pt-20 min-h-[100vh] px-4 mt-5">
        {activeAppSection === AppSection.HOME && <HomeScreen />}
        {activeAppSection === AppSection.MAP && <MapScreen />}
        {activeAppSection === AppSection.AR && <AR />}
        {activeAppSection === AppSection.RIDDLE && <Riddle />}
      </div>
      <Navbar
        activeAppSection={activeAppSection}
        setActiveAppSection={setActiveAppSection}
      />
    </div>
  );
}
