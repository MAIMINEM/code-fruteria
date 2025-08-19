import React from "react";
import { Typography } from "antd";

interface FruitBuySellStatusMessageProps {
  message: string;
}

const { Text } = Typography;

const FruitBuySellStatusMessage: React.FC<FruitBuySellStatusMessageProps> = ({ message }) => {
  return (
    <div>
      {message && (
        <Text
          strong
          style={{
            color: message.startsWith("Bought") ? "#52c41a" : message.startsWith("Not enough") ? "#f5222d" : "brown",
          }}
        >
          {message}
        </Text>
      )}
    </div>
  );
};

export default FruitBuySellStatusMessage;
