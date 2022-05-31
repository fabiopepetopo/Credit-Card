import "./card.scss";
import { FrontCard } from "../FrontCard";
import { BackCard } from "../BackCard";

import chipSrc from "../../assets/img/chip.png";
import personImage from "../../assets/img/person.png";
import visaSrc from "../../assets/img/visa-white.png";
import masterSrc from "../../assets/img/master.png";
import amexSrc from "../../assets/img/amex.png";
import { IdCard } from "../IdCard";

export const Card = ({ brand, cardFormValues }) => {
  const defaultValues = {
    cardNumber: "XXXX XXXX XXXX XXXX",
    cardName: "",
    cardThru: "XX / XX",
    cvv: "XXX",
    personalId: "XXXXXXXX",
    personalTypeId: "",
  };

  const creditCardValues = { ...defaultValues, ...cardFormValues };

  const brandsLogos = {
    visa: {
      src: visaSrc,
      alt: "Visa logo",
      background: "#614ad9",
    },
    master: {
      src: masterSrc,
      alt: "Master logo",
      background: "#161F73",
    },
    amex: {
      src: amexSrc,
      alt: "Amex logo",
      background: "#629F86",
    },
    default: {
      src: "",
      alt: "Card logo",
      background: "#614ad9",
    },
  };

  const chipImage = {
    src: chipSrc,
    alt: "Chip image",
  };

  const styles = {
    backgroundColor: brandsLogos[brand]?.background,
  };

  return (
    <>
      <div
        className={`flip-container mb-5 ${
          cardFormValues?.showBack ? "showBack" : ""
        }${cardFormValues?.showPerson ? "hide" : ""}`}
      >
        <div className="credit-card card-shadow" style={styles}>
          <FrontCard
            chipImage={chipImage}
            cardLogo={brandsLogos[brand]}
            values={creditCardValues}
          />
          <BackCard cvv={creditCardValues.cvv} />
        </div>
      </div>

      <div
        className={`flip-container mb-5 ${
          cardFormValues?.showPerson ? "showPerson" : "hide"
        }`}
      >
        <div className="personal-id card-shadow">
          <IdCard personImage={personImage} values={creditCardValues} />
        </div>
      </div>
    </>
  );
};
