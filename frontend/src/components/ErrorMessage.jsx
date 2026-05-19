const ErrorMessage = ({ message }) => (
  <div className="error-message">
    <p>{message || 'Something went wrong. Please try again.'}</p>
  </div>
);

export default ErrorMessage;
