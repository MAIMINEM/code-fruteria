import React from "react";
import { Fruit } from "../../engine/MockFruitMachine";
import "./FruitInventoryItem.less";

import List from "antd/es/list"
import Text from "antd/es/typography/Text";
import "antd/es/list/style";
import "antd/es/typography/style";

// Inventory section component

interface FruitInventoryItemProps {
  fruit: Fruit;
  amount: number;
}

const FruitInventoryItem: React.FC<FruitInventoryItemProps> = ({ fruit, amount }) => (
  <List.Item className="fruit-view-list-item">
    <Text className="fruit-view-fruit">{fruit}: </Text>
    <Text strong className="fruit-view-fruit-amount">
      {amount}
    </Text>
  </List.Item>
);

export default FruitInventoryItem;
