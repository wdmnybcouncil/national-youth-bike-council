import React from "react";
import PropTypes from "prop-types";
import Section from "../components/Section";
import Post from "../components/Post/Post";
import PageLink from "../components/PageLink";
import postImage from "../assets/images/media-coverage/youth-voice-is-important.png";

/**
 * The **MediaCoverage** component renders the view that shows all the media coverage posts.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function MediaCoverage({ mediaCoverageView }) {
  const renderPostLinks = (links) => {
    return (
      <>
        {links.post && (<PageLink type="external" linkTo={links.post}>Post</PageLink>)}
        {links.article && (<PageLink type="external" linkTo={links.article}>Article</PageLink>)}
        {links.video && (<PageLink type="external" linkTo={links.video}>Video</PageLink>)}
      </>
    )
  }

  const renderPosts = (posts) => (
    posts.map((post) => {
      const { title, date, text, img, links } = post;
      return (
        <Post key={title}>
          <div className="col-span-2 place-self-center lg:row-auto">
            <Post.Img src={img.src} alt={img.alt} className="object-cover object-center" />
          </div>
          <div className="col-span-2 flex flex-col gap-1 max-w-2xl mx-auto">
            <Post.Title>{title}</Post.Title>
            <Post.Subtitle>{date}</Post.Subtitle>
            <Post.Text>{text.brief}</Post.Text>
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
              {renderPostLinks(links)}
            </div>
          </div>
        </Post>
      )
    })
  )

  return (
    <>
      <Section>
        <Section.Heading>{mediaCoverageView[0].heading}</Section.Heading>
        <div className="flex flex-col gap-10">
          {renderPosts(mediaCoverageView[0].posts)}
        </div>
      </Section>
    </>
  );
}

const propTypes = {
  mediaCoverageView: PropTypes.array.isRequired,
};

MediaCoverage.displayName = "MediaCoverage";
MediaCoverage.propTypes = propTypes;

export default MediaCoverage;
