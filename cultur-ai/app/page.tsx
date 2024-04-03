"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import Riddle from "./components/Riddle/Riddle";
import AR from "./components/AR/AR";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import MapScreen from "./components/MapScreen/MapScreen";

export enum AppSection {
  HOME = "HOME",
  MAP = "MAP",
  AR = "AR",
  RIDDLE = "RIDDLE",
}

export default function Home() {
  const [activeAppSection, setActiveAppSection] = useState<AppSection>(AppSection.HOME)
  return (
    <div className="flex w-full bg-black flex-col items-center justify-center p-4 h-full">
      {activeAppSection === AppSection.HOME && <HomeScreen />}
      {activeAppSection === AppSection.MAP && <MapScreen />}
      {activeAppSection === AppSection.AR && <AR />}
      {activeAppSection === AppSection.RIDDLE && <Riddle />}
      <Navbar activeAppSection={activeAppSection} setActiveAppSection={setActiveAppSection}/>
    </div>
  );
}
