import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Login({ user = {} }) {
  const [email, setEmail] = useState(user.email || '');

  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      {/* Add other form fields as needed */}
    </form>
  );
}

Login.defaultProps = {
  user: {},
};

Login.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
};

export default Login;