import React, { useState } from "react";

const CardContext = React.createContext();

const CardProvider = (props) => {
  const [cardFormValues, setCardFormValues] = useState({
    installmentsOptions: props?.config?.initialValues?.installmentsOptions,
    personalTypeIdOptions: props?.config?.initialValues?.personalTypeIdOptions,
  });
  const [brand, setBrand] = useState("default");
  const config = props.config;
  const amount = props.amount;
  const setPaymentValues = props.setPaymentValues;
  const colors = config.colors;

  return (
    <CardContext.Provider
      value={{
        cardFormValues,
        setCardFormValues,
        config,
        brand,
        setBrand,
        amount,
        setPaymentValues,
        colors,
      }}
    >
      {props.children}
    </CardContext.Provider>
  );
};
export { CardContext, CardProvider };
