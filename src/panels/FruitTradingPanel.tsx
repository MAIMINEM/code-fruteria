// Inventory list item component
import React, { useState } from "react";
import { MockFruitMachine, Fruit } from "../../engine/MockFruitMachine";
import { useInventoryStore } from "../store/inventoryStore";
import "./FruitTradingPanel.less";
import FruitInventoryItem from "../components/FruitInventoryItem";
import FruitBuySellStatusMessage from "../components/FruitBuySellStatusMessage";

import InputNumber from "antd/es/input-number";
import "antd/es/input-number/style";

import Select from "antd/es/select";
import "antd/es/select/style";

import Title from "antd/es/typography/Title";
import "antd/es/typography/style";

import List from "antd/es/list";
import "antd/es/list/style";

import antdMessage from "antd/es/message";
import "antd/es/message/style";

import Button from "antd/es/button";
import "antd/es/button/style";

import Form from "antd/es/form";
import "antd/es/form/style";

import Card from "antd/es/card";
import "antd/es/card/style";

const fruitList: Fruit[] = ["apple", "banana", "orange"];
const machine = new MockFruitMachine();

const FruitTradingPanel: React.FC = () => {
  const inventory = useInventoryStore((state) => state.inventory);
  const setInventory = useInventoryStore((state) => state.setInventory);
  const [selectedFruit, setSelectedFruit] = useState<Fruit>("apple");
  const [amount, setAmount] = useState(1);
  const [message, setMessage] = useState("");

  // Handle buy action and update buy/sell message status
  const handleBuy = () => {
    machine.buy(selectedFruit, amount);
    const isPlural = amount > 1 ? "s" : "";
    setMessage(`Bought ${amount} ${selectedFruit}${isPlural}.`);
    antdMessage.success(`Bought ${amount} ${selectedFruit}${isPlural}.`);
    setInventory(machine.getInventory() as Record<Fruit, number>);
  };

  // Handle sell action and update buy/sell message status

  const handleSell = () => {
    if (inventory[selectedFruit] < amount) {
      setMessage(`Not enough ${selectedFruit}s in inventory.`);
      return;
    } else {
      machine.sell(selectedFruit, amount);
      const isPlural = amount > 1 ? "s" : "";
      setMessage(`Sold ${amount} ${selectedFruit}${isPlural}.`);
      antdMessage.info(`Sold ${amount} ${selectedFruit}${isPlural}.`);
    }
    setInventory(machine.getInventory() as Record<Fruit, number>);
  };

  // Handle fruit selection change and reset buy/sell message status
  const handleSelectedFruitChange = (value: Fruit) => {
    setSelectedFruit(value);
    setMessage("");
  };

  return (
    <div className="fruit-view-panel">
      <Card className="fruit-view-card">
        <Form layout="horizontal" className="fruit-view-form" onSubmitCapture={(e) => e.preventDefault()}>
          <Form.Item label="Fruit" style={{ textAlign: "right" }}>
            <Select
              value={selectedFruit}
              onChange={handleSelectedFruitChange}
              style={{ textAlign: "left", width: "200px" }}
            >
              {fruitList.map((fruit) => (
                <Select.Option key={fruit} value={fruit} style={{ textAlign: "left" }}>
                  {fruit}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Amount" style={{ textAlign: "right" }}>
            <InputNumber min={1} value={amount} onChange={(value) => setAmount(Number(value))} style={{ width: 200 }} />
          </Form.Item>
          <Form.Item>
            <div className="fruit-view-button-group">
              <Button type="primary" onClick={handleBuy}>
                Buy
              </Button>
              <Button type="default" onClick={handleSell}>
                Sell
              </Button>
            </div>
          </Form.Item>
        </Form>
        <div className="fruit-view-message">{<FruitBuySellStatusMessage message={message} />}</div>
        <Title level={4} className="fruit-view-inventory-title">
          Inventory
        </Title>
        <List
          size="small"
          dataSource={fruitList}
          renderItem={(fruit) => <FruitInventoryItem key={fruit} fruit={fruit} amount={inventory[fruit]} />}
        />
      </Card>
    </div>
  );
};

export default FruitTradingPanel;
