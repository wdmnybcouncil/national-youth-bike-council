import PropTypes from 'prop-types';

/**
 * The **ProfileCardTitle** component renders a title for user profile card in the webpage
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function ProfileCardTitle({ children }) {
  return <h3 className="text-center font-semibold uppercase text-skin-primary">{children}</h3>;
}

const propTypes = {
  children: PropTypes.any.isRequired,
};

ProfileCardTitle.displayName = 'ProfileCardTitle';
ProfileCardTitle.propTypes = propTypes;

export default ProfileCardTitle;
