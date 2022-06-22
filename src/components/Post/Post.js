import React from "react";
import PropTypes from "prop-types";
import PostTitle from "./PostTitle";
import PostSubtitle from "./PostSubtitle";
import PostText from "./PostText";
import PostImg from "./PostImg";

/**
 * The **Post** component renders a media coverage or blog post in the webpage
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function Post({ className, children }) {
  return (
    <div className={`relative grid min-h-[400px] max-w-full grid-cols-2 gap-8 rounded-2xl bg-skin-fill-card-accent p-6 lg:grid-cols-4 md:gap-16 md:p-8 ${className}`}>
      {children}
    </div>
  );
}

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
};

Post.displayName = "Post";
Post.propTypes = propTypes;

export default Object.assign(Post, {
  Title: PostTitle,
  Subtitle: PostSubtitle,
  Text: PostText,
  Img: PostImg,
});
