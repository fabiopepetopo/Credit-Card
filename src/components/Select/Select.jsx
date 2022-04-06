import "./select.scss";
import { useTranslation } from "react-i18next";

export const Select = ({ label, id, options, handleChange }) => {
  const { t } = useTranslation("common");
  return (
    <>
      <div className="field is-flex is-flex-direction-column p-2">
        <label htmlFor={id} className="is-size-8">
          {t(label)}
        </label>
        <select id={id} className="select is-size-7" onChange={handleChange}>
          {options?.map((element, index) => {
            return (
              <option key={index} value={element.value}>
                {element.label}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};
