import "./button.scss";

export const Button = ({ label, href, type, classNames, disabled }) => {
  return (
    <>
      {href ? (
        <a href={href} className={classNames}>
          {label}
        </a>
      ) : (
        <button disabled={disabled} type={type} className={classNames}>
          {label}
        </button>
      )}
    </>
  );
};
