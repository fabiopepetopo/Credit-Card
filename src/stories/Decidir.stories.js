import React, { useEffect, useState } from "react";

import { CardForm, usePayment } from "../";
import { Decidir } from "../helpers";

export default {
  title: "Decidir",
  component: DecidirIntegration,
  argTypes: {
    api_key: {
      type: { name: "string", required: true },
      defaultValue: "INSERT_YOUR_API_KEY",
      description: "Find your fuckikng key, and paste it here",
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

  const dataForTest = {
    card_number: "4507990000004905",
    card_expiration_month: "08",
    card_expiration_year: "24",
    security_code: "123",
    card_holder_name: "John Doe",
    card_holder_identification: {
      type: "dni",
      number: "25123456",
    },
  };

  const decidirCallbacks = {
    fetchBrand: async (bin) => {
      if (bin.length < 6) {
        return;
      }

      let results = await decidir.getPaymentMethods(bin);
      console.log(results);

      return results[0].id;
    },
  };

  const decidirSubmit = async (cardValues) => {
    let monthAndYear = cardValues.cardThru.split("/");
    return await decidir.createCardToken({
      card_number: cardValues.cardNumber.replace(/\s/g, ""),
      card_holder_name: cardValues.cardName,
      card_expiration_month: monthAndYear[0],
      card_expiration_year: monthAndYear[1],
      security_code: cardValues.cvv,
      card_holder_identification: {
        type: "DNI",
        number: cardValues.personalId,
      },
    });
  };

  const decidirConfig = {
    callbacks: decidirCallbacks,
    submit: decidirSubmit,
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
      userConfig={decidirConfig}
      amount={amount}
      setPaymentValues={setPaymentValues}
    />
  );
};

export const Default = ({ api_key, colors }) => (
  <DecidirIntegration api_key={api_key} colors={colors} />
);
