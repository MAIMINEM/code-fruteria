import React from "react";
import FruitBookPanel from "./FruitBookPanel";
import AboutPanel from "./AboutPanel";
import { FruitViewPanel } from "./FruitViewPanel";

export const panelList = [
  { key: "fruitbook", title: "Fruit Book", content: <FruitBookPanel /> },
  { key: "fruitview", title: "Fruit View", content: <FruitViewPanel /> },
  { key: "about", title: "About", content: <AboutPanel /> },
];
