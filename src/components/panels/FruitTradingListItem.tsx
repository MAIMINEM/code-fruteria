import React from "react";
import { Fruit } from "../../../engine/MockFruitMachine";
import "./FruitTradingListItem.less";

import List from "antd/es/list";
import Text from "antd/es/typography/Text";
import "antd/es/list/style";
import "antd/es/typography/style";

// Inventory section component

interface FruitTradingListItemProps {
  fruit: Fruit;
  amount: number;
}

const FruitTradingListItem: React.FC<FruitTradingListItemProps> = ({ fruit, amount }) => (
  <List.Item className="fruit-view-list-item">
    <Text className="fruit-view-fruit">{fruit}: </Text>
    <Text strong className="fruit-view-fruit-amount">
      {amount}
    </Text>
  </List.Item>
);

export default FruitTradingListItem;
