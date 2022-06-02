export const MercadoPagoConfig = (mp) => {
  return {
    callbacks: {
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
    },
    submit: async (cardValues) => {
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
    },
  };
};
