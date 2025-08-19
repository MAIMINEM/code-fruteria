import React from "react";
import FruitInventoryPanel from "./FruitInventoryPanel";
import AboutPanel from "./AboutPanel";
import FruitTradingPanel from "./FruitTradingPanel";

export const panelList = [
  { key: "fruitInventory", title: "Fruit Inventory", content: <FruitInventoryPanel /> },
  { key: "fruitTrading", title: "Fruit Trading", content: <FruitTradingPanel /> },
  { key: "about", title: "About", content: <AboutPanel /> },
];
