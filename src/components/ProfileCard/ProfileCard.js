import React from "react";
import PropTypes from "prop-types";
import ProfileCardTitle from "./ProfileCardTitle";
import ProfileCardSubtitle from "./ProfileCardSubtitle";
import ProfileCardText from "./ProfileCardText";

/**
 * The **ProfileCard** component renders a card for user profile in the webpage
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function ProfileCard({ children }) {
  return (
    <article className="p-6 flex max-w-sm flex-col gap-1 rounded-2xl bg-skin-fill-card-accent lg:p-8">
      {children}
    </article>
  );
}

const propTypes = {
  children: PropTypes.any.isRequired,
};

ProfileCard.displayName = ProfileCard;
ProfileCard.protoTypes = propTypes;

export default Object.assign(ProfileCard, {
  Title: ProfileCardTitle,
  Subtitle: ProfileCardSubtitle,
  Text: ProfileCardText,
});
