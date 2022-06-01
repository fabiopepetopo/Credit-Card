import React, { useEffect, useState } from "react";

import { CardForm, usePayment } from "../";

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

  const mpCallbacks = {
    fetchBrand: async (bin) => {
      if (bin.length < 6) {
        return;
      }

      let result = await mp.getPaymentMethods({ bin: bin });

      return result.results[0].id;
    },
    fetchInstallments: async (bin, amount) => {
      if (bin.length < 6) {
        return;
      }
      let result = await mp.getInstallments({
        bin: bin,
        amount: amount,
      });

      return result[0].payer_costs.map((element) => {
        return {
          label: element.recommended_message,
          value: element.installments,
        };
      });
    },
  };

  const mpSubmit = async (cardValues) => {
    let monthAndYear = cardValues.cardThru.split("/");
    return await mp.createCardToken({
      cardNumber: cardValues.cardNumber.replace(/\s/g, ""),
      cardholderName: cardValues.cardName,
      cardExpirationMonth: monthAndYear[0],
      cardExpirationYear: monthAndYear[1],
      securityCode: cardValues.cvv,
      identificationType: "DNI",
      identificationNumber: cardValues.personalId,
    });
  };

  const mpConfig = {
    callbacks: mpCallbacks,
    submit: mpSubmit,
  };
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
      userConfig={mpConfig}
      amount={amount}
      setPaymentValues={setPaymentValues}
    />
  );
};

export const Default = ({ api_key, colors }) => (
  <MercadopagoIntegration api_key={api_key} colors={colors} />
);
