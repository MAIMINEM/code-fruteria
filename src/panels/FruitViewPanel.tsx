// Inventory list item component
import React, { useState } from "react";
import { MockFruitMachine, Fruit } from "../../engine/MockFruitMachine";
import { Card, Form, Select, InputNumber, Button, Typography, List, message as antdMessage } from "antd";
import "./FruitViewPanel.less";
import FruitInventoryItem from "../components/FruitInventoryItem";
import FruitBuySellStatusMessage from "../components/FruitBuySellStatusMessage";

const { Option } = Select;
const { Title } = Typography;

const fruitList: Fruit[] = ["apple", "banana", "orange"];
const machine = new MockFruitMachine();

export const FruitViewPanel: React.FC = () => {
  const [inventory, setInventory] = useState(machine.getInventory());
  const [selectedFruit, setSelectedFruit] = useState<Fruit>("apple");
  const [amount, setAmount] = useState(1);
  const [message, setMessage] = useState("");

  // Handle buy action and update buy/sell message status
  const handleBuy = () => {
    machine.buy(selectedFruit, amount);

    // check if amount is plural for the suffix
    const isPlural = amount > 1 ? "s" : "";

    setMessage(`Bought ${amount} ${selectedFruit}${isPlural}.`);
    antdMessage.success(`Bought ${amount} ${selectedFruit}${isPlural}.`);

    setInventory(machine.getInventory());
  };

  // Handle sell action and update buy/sell message status
  const handleSell = () => {
    if (inventory[selectedFruit] < amount) {
      setMessage(`Not enough ${selectedFruit}s in inventory.`);
      return;
    } else {
      machine.sell(selectedFruit, amount);
      const isPlural = amount > 1 ? "s" : "";

      setMessage(` Sold ${amount} ${selectedFruit}${isPlural}.`);
      antdMessage.info(`Sold ${amount} ${selectedFruit}${isPlural}.`);
    }

    setInventory(machine.getInventory());
  };

  // Handle fruit selection change and reset buy/sell message status
  const handleSelectedFruitChange = (value: Fruit) => {
    setSelectedFruit(value);
    setMessage("");
  };

  return (
    <div className="fruit-view-panel">
      <Card className="fruit-view-card">
        <Title level={3} className="fruit-view-title">
          Fruit View
        </Title>
        <Form layout="inline" className="fruit-view-form" onSubmitCapture={(e) => e.preventDefault()}>
          <Form.Item label="Fruit">
            <Select value={selectedFruit} onChange={handleSelectedFruitChange} style={{ width: 120 }}>
              {fruitList.map((fruit) => (
                <Option key={fruit} value={fruit}>
                  {fruit}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Amount">
            <InputNumber min={1} value={amount} onChange={(value) => setAmount(Number(value))} style={{ width: 80 }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleBuy} style={{ marginRight: 40 }}>
              Buy
            </Button>

            <Button type="default" onClick={handleSell}>
              Sell
            </Button>
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
