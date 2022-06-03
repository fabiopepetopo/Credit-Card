import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const useValidations = (validations) => {
  const [errors, setErrors] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);
  const { i18n } = useTranslation();

  const validateAll = (values) => {
    let newErrors = Object.assign({}, errors);
    for (const field in validations) {
      newErrors[field] = validate(field, values[field], validations[field]);
    }
    setErrors(newErrors);
  };

  const validate = (field, value, validation) => {
    const language = i18n.language.split("-")[0];
    let message = null;

    if (validation?.required?.value && !value) {
      message = validation?.required?.message[language];
    }

    const pattern = validation?.pattern;
    if (!!value && pattern?.value && !RegExp(pattern.value).test(value)) {
      message = pattern.message[language];
    }

    const custom = validation?.custom;
    if (!!value && custom?.isValid && !custom.isValid(value)) {
      message = custom.message[language];
    }

    return message;
  };

  const isEmpty = (errors) => {
    return Object.values(errors).every((x) => x === null || x === "");
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0) return;
    setCanSubmit(isEmpty(errors) ? true : false);
  }, [errors]);

  return {
    validateAll,
    validate,
    setErrors,
    errors,
    canSubmit,
  };
};
