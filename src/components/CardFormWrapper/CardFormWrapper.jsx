import "./card-form.scss";
import { Card } from "../Card";
import { PaymentForm } from "../PaymentForm";
import { useContext } from "react";
import { CardContext } from "../../contexts";

export const CardFormWrapper = () => {
  const { cardFormValues, brand } = useContext(CardContext);

  return (
    <div className={"cardForm"}>
      <Card brand={brand} cardFormValues={cardFormValues} />
      <PaymentForm />
    </div>
  );
};
