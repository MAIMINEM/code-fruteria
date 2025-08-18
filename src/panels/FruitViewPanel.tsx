import React, { useState } from "react";
import { MockFruitMachine, Fruit } from "../../engine/MockFruitMachine";
import { Card, Form, Select, InputNumber, Button, Typography, List, message as antdMessage } from "antd";
import "./FruitViewPanel.less";

const { Option } = Select;
const { Title, Text } = Typography;

const fruitList: Fruit[] = ["apple", "banana", "orange"];
const machine = new MockFruitMachine();

export const FruitViewPanel: React.FC = () => {
  const [inventory, setInventory] = useState(machine.getInventory());
  const [selectedFruit, setSelectedFruit] = useState<Fruit>("apple");
  const [amount, setAmount] = useState(1);
  const [message, setMessage] = useState("");

  const handleBuy = () => {
    machine.buy(selectedFruit, amount);
    setMessage(`Bought ${amount} ${selectedFruit}(s).`);
    antdMessage.success(`Bought ${amount} ${selectedFruit}(s).`);

    setInventory(machine.getInventory());
  };

  const handleSell = () => {
    if (inventory[selectedFruit] < amount) {
      setMessage(`Not enough ${selectedFruit}s in inventory.`);

      return;
    } else {
      machine.sell(selectedFruit, amount);
      setMessage(`Sold ${amount} ${selectedFruit}(s).`);
      antdMessage.info(`Sold ${amount} ${selectedFruit}(s).`);
    }

    setInventory(machine.getInventory());
  };

  return (
    <div className="fruit-view-panel">
      <Card className="fruit-view-card">
        <Title level={3} className="fruit-view-title">
          Fruit View
        </Title>
        <Form layout="inline" className="fruit-view-form" onSubmitCapture={(e) => e.preventDefault()}>
          <Form.Item label="Fruit">
            <Select value={selectedFruit} onChange={(value) => setSelectedFruit(value)} style={{ width: 120 }}>
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
            <Button type="primary" onClick={handleBuy}>
              Buy
            </Button>
            <Button type="default" onClick={handleSell}>
              Sell
            </Button>
          </Form.Item>
        </Form>
        <div className="fruit-view-message">
          {message && (
            <Text
              strong
              style={{
                color: message.startsWith("Bought")
                  ? "#52c41a"
                  : message.startsWith("Not enough")
                  ? "#f5222d"
                  : undefined,
              }}
            >
              {message}
            </Text>
          )}
        </div>
        <Title level={4} className="fruit-view-inventory-title">
          Inventory
        </Title>
        <List
          size="small"
          dataSource={fruitList}
          renderItem={(fruit) => (
            <List.Item className="fruit-view-list-item">
              <Text className="fruit-view-fruit">
                {fruit}:{" "}
                <Text strong className="fruit-view-fruit-amount">
                  {inventory[fruit]}
                </Text>
              </Text>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};
