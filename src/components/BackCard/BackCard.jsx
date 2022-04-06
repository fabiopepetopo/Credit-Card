import "./back.scss";
import { CardField } from "../CardField";

export const BackCard = ({ cvv }) => {
  return (
    <>
      <div className="back">
        <div className="magnetic-bar mt-4"> </div>
        <div className="cvv p-2 has-text-right">
          <p className="has-text-white is-size-7 mr-1 mb-1 has-text-weight-bold">
            CVV
          </p>
          <div className="cvv-input is-size-6">
            <CardField classNames="mr-1" value={cvv} />
          </div>
        </div>
      </div>
    </>
  );
};
