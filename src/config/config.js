const personalTypeIdOptions = [
  { label: "DNI", value: "DNI" },
  { label: "CI", value: "Cédula" },
  { label: "LC", value: "L.C." },
  { label: "LE", value: "L.E." },
  { label: "Otro", value: "Otro" },
];

const installmentsOptions = [
  { label: "1 cuota", value: 1 },
  { label: "3 cuotas", value: 3 },
  { label: "6 cuotas ", value: 6 },
  { label: "12 cuotas", value: 12 },
  { label: "18 cuotas", value: 18 },
];

const colors = {
  primaryColor: "#d7d79e",
  accentColor: "#1aa3af",
  backgroundColor: "#ffffff",
  textColor: "#4A4A75",
};

const formatters = {
  creditCardFormatter: (value) => {
    value = value.replace(/\D/g, "");
    if (value.length < 4) return value;
    if (value.length > 17) {
      value = value.slice(0, 17);
    }
    return value
      .replace(/[^\dA-Z]/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  },
  nameFormatter: (value) => {
    return value.replace(/\d/g, "").toUpperCase();
  },
  cvvFormatter: (value) => {
    return value.slice(0, 4);
  },
  cardThruFormatter: (value) => {
    if (value.length < 3) {
      return value.replace(/[^\dA-Z]/g, "");
    }
    if (value.length > 5) {
      value = value.slice(0, 5);
    }
    return value
      .replace(/[^\dA-Z]/g, "")
      .replace(/(.{2})/, "$1/")
      .trim();
  },
};

const validations = {
  cardName: {
    pattern: {
      value: "^[A-Za-z\\s]*$",
      message: {
        es: "́Únicamente letras",
        en: "Only use letters and spaces",
      },
    },
    required: {
      value: true,
      message: {
        es: "Campo obligatorio",
        en: "This field is required",
      },
    },
  },
  cvv: {
    required: {
      value: true,
      message: {
        es: "Campo obligatorio",
        en: "This field is required",
      },
    },
  },
  cardNumber: {
    required: {
      value: true,
      message: {
        es: "Campo obligatorio",
        en: "This field is required",
      },
    },
    pattern: {
      value: "^[0-9\\s]{18,21}$",
      message: {
        es: "Número de tarjeta invalido",
        en: "Invalid credit card value",
      },
    },
  },
  personalId: {
    required: {
      value: true,
      message: {
        es: "Campo obligatorio",
        en: "This field is required",
      },
    },
  },
  cardThru: {
    required: {
      value: true,
      message: {
        es: "Campo obligatorio",
        en: "This field is required",
      },
    },
    custom: {
      isValid: (value) => {
        let monthAndYear = value.split("/");
        let month = parseInt(monthAndYear[0]);
        let year = parseInt(monthAndYear[1]);
        let date = new Date();
        let thisYear = date.getYear() - 100;
        let thisMonth = date.getMonth();

        if (!month || month > 12 || (month < thisMonth && year === thisYear))
          return false;
        return !(!year || year < thisYear);
      },
      message: {
        es: "Fecha inválida",
        en: "Not a valid date.",
      },
    },
  },
};

const fields = [
  {
    type: "Input",
    id: "cardName",
    label: "cardNameLabel",
    placeholder: "cardNamePlaceHolder",
    formatter: formatters?.nameFormatter,
  },
  {
    type: "Input",
    id: "cardNumber",
    label: "cardNumberLabel",
    placeholder: "cardNumberPlaceHolder",
    formatter: formatters?.creditCardFormatter,
  },
  {
    type: "InputGroup",
    fields: [
      {
        type: "Input",
        id: "cardThru",
        label: "cardThruLabel",
        placeholder: "cardThruPlaceHolder",
        formatter: formatters?.cardThruFormatter,
      },
      {
        type: "Input",
        id: "cvv",
        label: "cvvLabel",
        placeholder: "cvvPlaceHolder",
        formatter: formatters?.cvvFormatter,
        changeOnFocus: ["showBack", true],
        changeOnBlur: ["showBack", false],
      },
    ],
  },
  {
    type: "InputGroup",
    fields: [
      {
        type: "Select",
        id: "personalTypeId",
        label: "personalTypeIdLabel",
      },
      {
        type: "Input",
        id: "personalId",
        label: "personalIdLabel",
        placeholder: "personalIdPlaceHolder",
        changeOnFocus: ["showPerson", true],
        changeOnBlur: ["showPerson", false],
      },
    ],
  },
  {
    type: "Select",
    id: "installments",
    label: "installmentsLabel",
  },
];

export const defaultConfig = {
  colors: colors,
  fields: fields,
  validations: validations,
  initialValues: {
    installmentsOptions,
    personalTypeIdOptions,
  },
};
