import "./idCard.scss";

export const IdCard = ({ values, personImage }) => {
  return (
    <>
      <div className="personal-id is-flex is-flex-direction-column is-justify-content-center is-align-items-start p-3">
        <div
          style={{ width: "100%" }}
          className="is-flex is-justify-start is-align-items-center"
        >
          {personImage && (
            <img
              src={personImage}
              alt="person image"
              className="person-image"
            />
          )}
          <div className="id-inputs is-flex is-flex-direction-row is-justify-content-space-evenly is-align-items-center">
            <p className="is-size-5">{values?.personalTypeId}</p>
            <p className="is-size-4">{values?.personalId}</p>
          </div>
        </div>
      </div>
    </>
  );
};
