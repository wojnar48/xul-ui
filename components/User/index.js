import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

// A convenience component that will allow us to easily get
// the current use without nesting `Query` wherever the data
// is required.
const User = (props) => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {(payload) => props.children(payload)}
  </Query>
);

User.propTypes = {
  children: PropTypes.func.isRequired,
};

export default User;
