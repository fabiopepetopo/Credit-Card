import React, { useEffect, useState } from "react";

import { CardForm, usePayment } from "../";
import { Decidir } from "../helpers";

export default {
  title: "DecidirAndMercadoPago",
  component: DecidirAndMercadoPagoIntegration,
  argTypes: {
    decidir_api_key: {
      type: { name: "string", required: true },
      defaultValue: "INSERT_YOUR_API_KEY",
      description: "Find your fucking key, and paste it here",
      control: {
        type: "text",
      },
    },
    mercado_pago_api_key: {
      type: { name: "string", required: true },
      defaultValue: "INSERT_YOUR_API_KEY",
      description: "Find the other fucking key, and paste it here",
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

const DecidirAndMercadoPagoIntegration = ({
  decidir_api_key,
  mercado_pago_api_key,
}) => {
  const { paymentValues, setPaymentValues } = usePayment();
  const [showToken, setShowToken] = useState(false);

  const decidir = Decidir(decidir_api_key || "INSERT_YOUR_API_KEY");
  const mp = new MercadoPago(mercado_pago_api_key || "INSERT_YOUR_API_KEY", {
    locale: "es-AR",
    advancedFraudPrevention: true,
  });

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

  const provider = (cardNumber) => {
    return cardNumber && cardNumber[0] === "4" ? "mercadopago" : "decidir";
  };

  const customConfig = {
    multiple: true,
    provider: provider,
    callbacks: {
      decidir: decidirCallbacks,
      mercadopago: mpCallbacks,
    },
    submit: {
      decidir: decidirSubmit,
      mercadopago: mpSubmit,
    },
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
      userConfig={customConfig}
      amount={amount}
      setPaymentValues={setPaymentValues}
    />
  );
};

export const Default = ({ decidir_api_key, mercado_pago_api_key, colors }) => (
  <DecidirAndMercadoPagoIntegration
    decidir_api_key={decidir_api_key}
    mercado_pago_api_key={mercado_pago_api_key}
    colors={colors}
  />
);
