<img src="https://storage.googleapis.com/pepetopo-images/Color%20logo%20with%20background.png" width="150px" />

[![en](https://img.shields.io/badge/lang-en-red.svg)](./README.md)
[![es](https://img.shields.io/badge/lang-es-yellow.svg)](/README.es.md)

# Credit card tokenizator

A react component that allows you to tokenize a debit/credit card for any payment provider.

## Basic Usage

A quick example using MercadoPago as provider.

```JavaScript
const MercadopagoIntegration = ({ api_key }) => {
  const { paymentValues, setPaymentValues } = usePayment();
  const [showToken, setShowToken] = useState(false);

  const mp = new MercadoPago(api_key || "INSERT_YOUR_API_KEY", {
    locale: "es-AR",
    advancedFraudPrevention: true,
  });
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
      userConfig={MercadoPagoConfig(mp)}
      amount={amount}
      setPaymentValues={setPaymentValues}
    />
  );
};
```

This should look like this:

<img src="https://storage.googleapis.com/pepetopo-images/form-example.gif" />


## Licensing

This sofware is covered by the MIT license, see [LICENSE](./LICENSE).