import PropTypes from 'prop-types';
import ProfileCardTitle from './ProfileCardTitle';
import ProfileCardSubtitle from './ProfileCardSubtitle';
import ProfileCardText from './ProfileCardText';
import ProfileCardImg from './ProfileCardImg';
import ProfileCardLocation from './ProfileCardLocation';

/**
 * The **ProfileCard** component renders a card for user profile in the webpage
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function ProfileCard({ className = '', onCardClick, userProfile, children }) {
  const handleCardClick = () => onCardClick(userProfile);

  return (
    <article
      className={`group relative mt-24 flex max-w-sm flex-col items-center gap-1 rounded-2xl border border-transparent bg-skin-fill-card-accent p-6 transition hover:cursor-pointer hover:border-skin-accent lg:p-8 ${className}`}
      onClick={handleCardClick}
    >
      {children}
    </article>
  );
}

const propTypes = {
  className: PropTypes.string,
  onCardClick: PropTypes.func.isRequired,
  userProfile: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
};

ProfileCard.displayName = 'ProfileCard';
ProfileCard.protoTypes = propTypes;

export default Object.assign(ProfileCard, {
  Title: ProfileCardTitle,
  Subtitle: ProfileCardSubtitle,
  Text: ProfileCardText,
  Img: ProfileCardImg,
  Location: ProfileCardLocation,
});
