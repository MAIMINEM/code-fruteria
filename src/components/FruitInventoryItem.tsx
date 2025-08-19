import React from "react";
import { Fruit } from "../../engine/MockFruitMachine";
import { Typography, List } from "antd";
import "./FruitInventoryItem.less";
// Inventory section component

const { Text } = Typography;

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
