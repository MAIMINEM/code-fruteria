import React from "react";
import FruitInventoryPanel from "../components/panels/FruitInventoryPanel";
import AboutPanel from "../components/panels/AboutPanel";
import FruitTradingPanel from "../components/panels/FruitTradingPanel";

const fakePanelList = [
  { key: "fruitInventory", title: "Fruit Inventory", content: <FruitInventoryPanel /> },
  { key: "fruitTrading", title: "Fruit Trading", content: <FruitTradingPanel /> },
  { key: "about", title: "About", content: <AboutPanel /> },
];

export default fakePanelList;
