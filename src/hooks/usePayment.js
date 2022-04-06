import { useState } from "react";

export const usePayment = () => {
  const [paymentValues, setPaymentValues] = useState({});

  return {
    paymentValues,
    setPaymentValues,
  };
};
