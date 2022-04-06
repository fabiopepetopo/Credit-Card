import { useValidations } from "./useValitations";
import { useState, useEffect, useContext } from "react";

export const useForm = (context) => {
  const {
    cardFormValues,
    setCardFormValues,
    config,
    setBrand,
    setPaymentValues,
    paymentValues,
    amount,
  } = useContext(context);

  const validations = config.validations;
  const { validateAll, validate, errors, setErrors, canSubmit } =
    useValidations(validations);

  const [sendRequest, setSendRequest] = useState(true);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    validateAll(cardFormValues);

    if (canSubmit) {
      config.submit(cardFormValues).then((result) => {
        setPaymentValues(() => ({
          ...paymentValues,
          token: result.id,
        }));
      });
    }
  };

  const handleChange = (event, formatter = null) => {
    event.persist();
    if (formatter) {
      event.target.value = formatter(event.target.value);
    }

    setCardFormValues(() => ({
      ...cardFormValues,
      [event.target.id]: event.target.value,
    }));
  };

  const handleOnFocus = (event) => {
    setErrors(() => ({
      ...errors,
      [event.target.id]: null,
    }));

    return (key, value) => {
      setCardFormValues(() => ({
        ...cardFormValues,
        [key]: value,
      }));
    };
  };

  const handleOnBlur = (event) => {
    let newErrors = {};
    newErrors[event.target.id] = validate(
      event.target.id,
      event.target.value,
      validations[event.target.id]
    );

    setErrors(() => ({
      ...errors,
      [event.target.id]: newErrors[event.target.id],
    }));

    return (key, value) => {
      setCardFormValues(() => ({
        ...cardFormValues,
        [key]: value,
      }));
    };
  };

  const defaultEvents = {
    handleChange,
    handleOnFocus,
    handleOnBlur,
    handleSubmit,
  };

  const withEvents = (field) => {
    const fieldWithCustomEvents = withCustomEvents(field);
    return { ...defaultEvents, ...fieldWithCustomEvents };
  };

  const withCustomEvents = (field) => {
    const fieldWithCustomEvents = { ...field };
    if (field.changeOnFocus) {
      fieldWithCustomEvents.handleOnFocus = (event) => {
        handleOnFocus(event)(...field.changeOnFocus);
      };
    }
    if (field.changeOnBlur) {
      fieldWithCustomEvents.handleOnBlur = (event) => {
        handleOnBlur(event)(...field.changeOnBlur);
      };
    }
    return fieldWithCustomEvents;
  };

  const withOptions = (field) => {
    const fieldWithOptions = { ...field };
    fieldWithOptions.options = cardFormValues[`${field.id}Options`];
    return fieldWithOptions;
  };

  const withPossibleErrors = (field) => {
    const fieldWithErrors = { ...field };
    fieldWithErrors.error = errors[field.id];
    return fieldWithErrors;
  };

  // TODO: Why have i written this here? Move elsewhere
  const trimCard = (cardNumber) => {
    if (!cardNumber) return;
    return cardNumber.replace(/\s/g, "");
  };

  useEffect(() => {
    const cardNumber = trimCard(cardFormValues?.cardNumber);
    if (cardNumber?.length < 6) {
      setSendRequest(true);
      return;
    }
    if (cardNumber && sendRequest) {
      setSendRequest(false);
      config.callbacks.fetchBrand(cardNumber.substring(0, 6)).then((result) => {
        setBrand(result);
      });
      config.callbacks
        .fetchInstallments(cardNumber.substring(0, 6), amount)
        .then((result) => {
          setCardFormValues(() => ({
            ...cardFormValues,
            installmentsOptions: result,
          }));
        });
    }
  }, [cardFormValues.cardNumber]);

  return {
    canSubmit,
    withCustomEvents,
    withEvents,
    withOptions,
    withPossibleErrors,
  };
};
