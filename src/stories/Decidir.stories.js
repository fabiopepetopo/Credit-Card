import React, { useEffect, useState } from "react";

import { CardForm, usePayment } from "../";
import { Decidir, DecidirConfig } from "../helpers";

export default {
  title: "Decidir",
  component: DecidirIntegration,
  argTypes: {
    api_key: {
      type: { name: "string", required: true },
      defaultValue: "INSERT_YOUR_API_KEY",
      description: "Find your fucking key, and paste it here",
      control: {
        type: "text",
      },
    },
    colors: {
      type: { name: "string", required: false },
      defaultValue: {
        primaryColor: "#d7d79e",
        accentColor: "#1aa3af",
        backgroundColor: "#ffffff",
        textColor: "#4A4A75",
      },
      control: {
        type: "object",
      },
    },
  },
};

const DecidirIntegration = ({ api_key }) => {
  const { paymentValues, setPaymentValues } = usePayment();
  const [showToken, setShowToken] = useState(false);

  const decidir = Decidir(api_key || "INSERT_YOUR_API_KEY");
  const amount = "14500.35";

  useEffect(() => {
    if (paymentValues?.token) {
      setShowToken(true);
    }
  }, [paymentValues?.token]);

  return showToken ? (
    <div className="box">{paymentValues?.token}</div>
  ) : (
    <CardForm
      userConfig={DecidirConfig(decidir)}
      amount={amount}
      setPaymentValues={setPaymentValues}
    />
  );
};

export const Default = ({ api_key, colors }) => (
  <DecidirIntegration api_key={api_key} colors={colors} />
);
