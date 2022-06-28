import React from "react";
import PropTypes from "prop-types";
import Section from "../components/Section";
import FilterButton from "../components/FilterButton";
import Post from "../components/Post/Post";
import PageLink from "../components/PageLink";
import Pagination from "../components/Pagination";

/**
 * The **MediaCoverage** component renders the view that shows all the media coverage posts.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function MediaCoverage({ mediaCoverageView }) {
  const allPosts = mediaCoverageView[0].posts;

  //Settings for Filtering Posts
  const [postsToShow, setPostsToShow] = React.useState(allPosts);
  const [selectedFilterCategory, setSelectedFilterCategory] = React.useState("All");
  const filterTagsForPosts = ["All", ...new Set(allPosts.map(_ => _.category))];

  const handleFilterPosts = (selectedCategory) => {
    let newPostsToShow;
    if (selectedCategory !== "All") {
      newPostsToShow = allPosts.filter(_ => _.category === selectedCategory);
    } else {
      newPostsToShow = allPosts;
    }
    setSelectedFilterCategory(selectedCategory);
    setPostsToShow(newPostsToShow);
  }

  //Settings for Pagination
  let pageSize = 3;
  const [currentPage, setCurrentPage] = React.useState(1);

  const currentViewPosts = React.useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return postsToShow.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, postsToShow, pageSize]);

  // Helper functions to render fiter butons, links and posts
  const renderFilterButtons = () => {
    return filterTagsForPosts.map((filterTag) =>
      <FilterButton
        key={filterTag}
        filterCategory={filterTag}
        selectedFilterCategory={selectedFilterCategory}
        handleFilter={handleFilterPosts} />);
  }

  const renderPostLinks = (links) => {
    return (
      <>
        {links.post && (
          <PageLink type="external" linkTo={links.post}>
            Post
          </PageLink>
        )}
        {links.article && (
          <PageLink type="external" linkTo={links.article}>
            Article
          </PageLink>
        )}
        {links.video && (
          <PageLink type="external" linkTo={links.video}>
            Video
          </PageLink>
        )}
      </>
    );
  };

  const renderPosts = (posts) =>
    posts.map((post) => {
      const { title, date, text, img, links } = post;
      return (
        <Post key={title}>
          <div className="col-span-2 place-self-center lg:row-auto">
            <Post.Img src={img.src} alt={img.alt} className="object-cover object-center" />
          </div>
          <div className="col-span-2 mx-auto flex max-w-2xl flex-col gap-1">
            <Post.Title>{title}</Post.Title>
            <Post.Subtitle>{date}</Post.Subtitle>
            <Post.Text>{text.brief}</Post.Text>
            <div className="flex flex-wrap justify-center gap-8 lg:justify-start">{renderPostLinks(links)}</div>
          </div>
        </Post>
      );
    });

  return (
    <>
      <Section>
        <Section.Heading>{mediaCoverageView[0].heading}</Section.Heading>
        <div className="mb-4 flex flex-wrap gap-4 justify-center items-center md:justify-start">
          {renderFilterButtons()}
        </div>
        <div className="flex flex-col gap-10">{renderPosts(currentViewPosts)}</div>
        <Pagination currentPage={currentPage} totalCount={postsToShow.length} pageSize={pageSize} onPageChange={(page) => setCurrentPage(page)} />
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
