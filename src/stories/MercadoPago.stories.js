import React, { useEffect, useState } from "react";

import { CardForm, usePayment } from "../";
import { MercadoPagoConfig } from "../helpers";

export default {
  title: "Mercadopago",
  component: MercadopagoIntegration,
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

const MercadopagoIntegration = ({ api_key }) => {
  const { paymentValues, setPaymentValues } = usePayment();
  const [showToken, setShowToken] = useState(false);

  const mp = new MercadoPago(api_key || "INSERT_YOUR_API_KEY", {
    locale: "es-AR",
    advancedFraudPrevention: true,
  });
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
      userConfig={MercadoPagoConfig(mp)}
      amount={amount}
      setPaymentValues={setPaymentValues}
    />
  );
};

export const Default = ({ api_key, colors }) => (
  <MercadopagoIntegration api_key={api_key} colors={colors} />
);
