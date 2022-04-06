import "./front.scss";
import { CardField } from "../CardField";

export const FrontCard = ({ chipImage, cardLogo, values }) => {
  return (
    <>
      <div className="front is-flex is-flex-direction-column is-justify-content-center is-align-items-start p-3">
        <div className="chip is-flex is-justify-start is-align-items-center">
          <img
            src={chipImage?.src}
            alt={chipImage?.alt}
            className="card-chip"
          />
        </div>
        <div className="card-inputs">
          <CardField
            classNames="card-number has-text-white is-size-5"
            value={values?.cardNumber}
          />
          <CardField
            classNames="card-thru has-text-white is-size-7"
            value={values?.cardThru}
          />
          <CardField
            classNames="card-holder has-text-white is-size-6"
            value={values?.cardName}
          />
          {cardLogo?.src && (
            <img
              src={cardLogo?.src}
              alt={cardLogo?.alt}
              className="card-brand"
            />
          )}
        </div>
      </div>
    </>
  );
};
