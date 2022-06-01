export const Form = ({ onSubmit, children }) => {
  return (
    <>
      <form
        onSubmit={onSubmit}
        className="payment-form is-flex is-flex-direction-column p-5"
        autoComplete="off"
      >
        {children}
      </form>
    </>
  );
};
