import { Card } from "../Card";
import { PaymentForm } from "../PaymentForm";
import { useContext } from "react";
import { CardContext } from "../../contexts";

export const CardFormWrapper = () => {
  const { cardFormValues, brand } = useContext(CardContext);

  return (
    <>
      <Card brand={brand} cardFormValues={cardFormValues} />
      <PaymentForm />
    </>
  );
};
