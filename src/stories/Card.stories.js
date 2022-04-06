import React from "react";
import { Card } from "../";

export default {
  title: "Card",
  component: Card,
  argTypes: {
    brand: {
      options: ["default", "visa", "master", "amex"],
      control: { type: "select" },
    },
    showBack: {
      options: [true, false],
      control: { type: "boolean" },
    },
    showPerson: {
      options: [true, false],
      control: { type: "boolean" },
    },
  },
  args: {
    brand: "visa",
  },
};

export const Default = ({ brand, showBack, showPerson }) => (
  <Card
    brand={brand}
    cardFormValues={{ showBack: showBack, showPerson: showPerson }}
  />
);
