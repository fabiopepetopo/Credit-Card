import { CardProvider } from "../../contexts";
import { CardFormWrapper } from "../CardFormWrapper";
import { defaultConfig } from "../../config";
import "../../i18n";
import { useEffect } from "react";

export const CardForm = ({ userConfig, amount, setPaymentValues }) => {
  const config = { ...userConfig, ...defaultConfig };

  useEffect(() => {
    const root = document.documentElement;
    root?.style.setProperty(
      "--card-primary-color",
      config?.colors?.primaryColor
    );
    root?.style.setProperty(
      "--card-secondary-color",
      config?.colors?.secondaryColor
    );
    root?.style.setProperty("--card-third-color", config?.colors?.thirdColor);
    root?.style.setProperty("--card-fourth-color", config?.colors?.fourthColor);
  }, [config.colors]);

  return (
    <CardProvider
      config={config}
      amount={amount}
      setPaymentValues={setPaymentValues}
    >
      <CardFormWrapper />
    </CardProvider>
  );
};
