import "./input.scss";
import { useTranslation } from "react-i18next";

export const Input = ({
  label,
  id,
  placeholder,
  value,
  handleOnFocus,
  handleOnBlur,
  handleChange,
  formatter,
  error,
}) => {
  const { t } = useTranslation("common");

  return (
    <>
      <div className="field is-flex is-flex-direction-column p-2">
        <label htmlFor={id} className="is-size-8">
          {t(label)}
        </label>
        <input
          className={"is-size-7"}
          type="text"
          id={id}
          placeholder={t(placeholder)}
          value={value}
          onChange={(e) => handleChange(e, formatter)}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
        {error && <p className="help is-danger">{error}</p>}
      </div>
    </>
  );
};
