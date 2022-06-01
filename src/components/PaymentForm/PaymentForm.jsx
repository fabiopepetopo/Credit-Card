import "./payment-form.scss";

import { Input } from "../Input";
import { InputGroup } from "../InputGroup";
import { Select } from "../Select";
import { ButtonGroup } from "../ButtonGroup";
import { Button } from "../Button";
import { Form } from "../Form";
import { useForm } from "../../hooks";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

import { CardContext } from "../../contexts";

export const PaymentForm = () => {
  const { config } = useContext(CardContext);
  const { t } = useTranslation("common");
  const {
    withEvents,
    withPossibleErrors,
    withOptions,
    handleSubmit,
    canSubmit,
  } = useForm(CardContext);

  const buildInputType = (field, index) => {
    const eventField = withEvents(withPossibleErrors(field));
    if (field.type === "Select") {
      const selectField = withOptions(eventField);
      return <Select {...selectField} key={index} />;
    }
    if (field.type === "Input") return <Input {...eventField} key={index} />;
    if (field.type === "InputGroup") {
      return (
        <InputGroup key={index}>
          {field.fields.map((field, index) =>
            buildInputType(field, `10${index}`)
          )}
        </InputGroup>
      );
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {config &&
          config.fields.map((field, index) => buildInputType(field, index))}

        <ButtonGroup>
          <Button
            disabled={!canSubmit}
            type={"submit"}
            classNames={"p-2 is-size-6 button"}
            label={t("submitLabel")}
          />
          <Button
            href={"#"}
            classNames={"mt-3 mb-0 is-size-8"}
            label={t("cancelLabel")}
          />
        </ButtonGroup>
      </Form>
    </>
  );
};
