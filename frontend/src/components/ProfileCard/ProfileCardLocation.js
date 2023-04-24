import PropTypes from 'prop-types';

/**
 * The **ProfileCardLocation** component renders the location for user profile card in the webpage
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function ProfileCardLocation({ children }) {
  return (
    <p className="relative mt-2 text-sm before:absolute before:-top-0.5 before:-left-6 before:h-6 before:w-6 before:bg-[url('./assets/images/icon-location.svg')] before:bg-contain before:bg-no-repeat">
      {children}
    </p>
  );
}

const propTypes = {
  children: PropTypes.any.isRequired,
};

ProfileCardLocation.displayName = 'ProfileCardLocation';
ProfileCardLocation.propTypes = propTypes;

export default ProfileCardLocation;
