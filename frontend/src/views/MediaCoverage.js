import React from "react";
import Section from "../components/Section";
import FilterButton from "../components/FilterButton";
import Post from "../components/Post/Post";
import PageLink from "../components/PageLink";
import Pagination from "../components/Pagination";
import api from "../utils/api";

/**
 * The **MediaCoverage** component renders the view that shows all the media coverage posts.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function MediaCoverage() {
  const [mediaCoverageViewTextContent, setMediaCoverageViewTextContent] = React.useState([]);
  const [mediaCoveragePosts, setMediaCoveragePosts] = React.useState([]);

  //Settings for Filtering Posts
  const [postsToShow, setPostsToShow] = React.useState([]);
  const [selectedFilterCategory, setSelectedFilterCategory] = React.useState("All");
  const filterTagsForPosts = ["All", ...new Set(mediaCoveragePosts.map((_) => _.attributes.post_category))];

  // Get the text contents of the page
  React.useEffect(() => {
    api.getMediaCoverageViewTextContents()
      .then(response => setMediaCoverageViewTextContent(response.data))
      .catch(err => {
        console.log("Uh-oh! Error occurred while fetching the members data from the server.");
        console.log(err);
      });

    api.getMediaCoveragePosts()
      .then(response => {
        setMediaCoveragePosts(response.data);
        setPostsToShow(response.data);
      })
      .catch(err => {
        console.log("Uh-oh! Error occurred while fetching the members data from the server.");
        console.log(err);
      });
  }, []);

  const handleFilterPosts = (selectedCategory) => {
    let newPostsToShow;
    if (selectedCategory !== "All") {
      newPostsToShow = mediaCoveragePosts.filter((_) => _.attributes.post_category === selectedCategory);
    } else {
      newPostsToShow = mediaCoveragePosts;
    }
    setSelectedFilterCategory(selectedCategory);
    setPostsToShow(newPostsToShow);
    setCurrentPage(1);
  };

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
    return filterTagsForPosts.map((filterTag) => (
      <FilterButton key={filterTag} filterCategory={filterTag} selectedFilterCategory={selectedFilterCategory} handleFilter={handleFilterPosts} />
    ));
  };

  const renderPostLinks = ({ social_media_post, article, video }) => {
    return (
      <>
        {social_media_post && (
          <PageLink type="external" className="mt-4" linkTo={social_media_post}>
            Post
          </PageLink>
        )}
        {article && (
          <PageLink type="external" className="mt-4" linkTo={article}>
            Article
          </PageLink>
        )}
        {video && (
          <PageLink type="external" className="mt-4" linkTo={video}>
            Video
          </PageLink>
        )}
      </>
    );
  };

  const renderDate = (dateString) => {
    const dateParts = dateString.split('-');
    const newDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    const dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return newDate.toLocaleDateString('en-us', dateFormatOptions);
  }

  const renderPosts = (posts) =>
    posts.map((post) => {
      const { post_title, post_date, post_text, post_image, post_links } = post.attributes;
      const { image_file, alternate_text } = post_image;
      return (
        <Post key={post_title}>
          <div className="col-span-2 place-self-center lg:row-auto">
            <Post.Img src={image_file.data.attributes.url} alt={alternate_text} className="object-cover object-center" />
          </div>
          <div className="col-span-2 mx-auto flex max-w-2xl flex-col gap-1">
            <Post.Title>{post_title}</Post.Title>
            <Post.Subtitle>{post_date ? renderDate(post_date) : ''}</Post.Subtitle>
            <Post.Text>{post_text}</Post.Text>
            <div className="flex flex-wrap justify-center gap-8 lg:justify-start">{renderPostLinks(post_links)}</div>
          </div>
        </Post>
      );
    });

  return (
    <>
      {mediaCoveragePosts.length
        ? (
          <div className="my-8" aria-label="media coverage page">
            <Section>
              <Section.Heading>
                {mediaCoverageViewTextContent[0].attributes.section_heading}
              </Section.Heading>
              <div className="mb-4 flex flex-wrap items-center justify-center gap-4 md:justify-start">{renderFilterButtons()}</div>
              <div className="flex flex-col gap-10">{renderPosts(currentViewPosts)}</div>
              <Pagination currentPage={currentPage} totalCount={postsToShow.length} pageSize={pageSize} onPageChange={(page) => setCurrentPage(page)} />
            </Section>
          </div>
        )
        : null}
    </>
  );
}

MediaCoverage.displayName = "MediaCoverage";

export default MediaCoverage;
