import PropTypes from 'prop-types';

/**
 * The **ProfileCardSubtitle** component renders a subtitle for user profile card in the webpage
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function ProfileCardSubtitle({ children }) {
  return <p className="text-center text-sm font-semibold capitalize">{children}</p>;
}

const propTypes = {
  children: PropTypes.any.isRequired,
};

ProfileCardSubtitle.displayName = 'ProfileCardSubtitle';
ProfileCardSubtitle.propTypes = propTypes;

export default ProfileCardSubtitle;
