import { addParameters } from "@storybook/react";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: "centered",
  backgrounds: {
    default: "gradient",
    values: [
      {
        name: "gradient",
        value:
          "linear-gradient(160deg, rgba(26,163,175,1) 0%, rgba(110,186,149,1) 35%, rgba(215,215,158,1) 66%, rgba(248,237,204,1) 100%)",
      },
      {
        name: "solid",
        value: "rgba(26,163,175,1)",
      },
      {
        name: "white",
        value: "#FFF",
      },
    ],
  },
};
