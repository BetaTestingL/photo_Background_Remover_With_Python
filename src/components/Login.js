import React from 'react';
import PropTypes from 'prop-types';

const Login = (props) => {
  // Safely extract email from props.user, providing an empty object fallback
  const { email } = props?.user || {};

  // If additional logic depends on email, handle undefined gracefully
  // Example: display email if present, otherwise show placeholder
  return (
    <div className="login-form">
      <h2>Login</h2>
      {email ? (
        <p>Welcome back, {email}</p>
      ) : (
        <p>Please enter your credentials.</p>
      )}
      {/* Rest of the login form elements go here */}
    </div>
  );
};

Login.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
};

Login.defaultProps = {
  user: {},
};

export default Login;