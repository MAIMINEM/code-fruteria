import React from "react";
import Text from "antd/es/typography/Text";
import "antd/es/typography/style";

interface FruitBuySellStatusMessageProps {
  message: string;
}

const TradingStatusMessage: React.FC<FruitBuySellStatusMessageProps> = ({ message }) => {
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

export default TradingStatusMessage;
