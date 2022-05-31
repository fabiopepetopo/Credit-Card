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
    root?.style.setProperty("--card-accent-color", config?.colors?.accentColor);
    root?.style.setProperty(
      "--card-background-color",
      config?.colors?.backgroundColor
    );
    root?.style.setProperty("--card-text-color", config?.colors?.textColor);
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
