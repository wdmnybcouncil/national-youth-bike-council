import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import FilterButton from '../components/FilterButton';
import Post from '../components/Post/Post';
import Pagination from '../components/Pagination';
import api from '../utils/api';
import { formatDate } from '../utils/commonUtils';

/**
 * The **CouncilBlogs** component renders the view that shows all the council blog posts.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function CouncilBlogs() {
  const [councilBlogsViewTextContent, setCouncilBlogsViewTextContent] = useState([]);
  const [councilBlogPosts, setCouncilBlogPosts] = useState([]);

  //Settings for Filtering Posts
  const [postsToShow, setPostsToShow] = useState(councilBlogPosts);
  const [selectedFilterCategory, setSelectedFilterCategory] = useState('All');
  const filterTagsForPosts = ['All', ...new Set(councilBlogPosts.map((_) => _.attributes.post_category))];

  // Get the text contents of the page
  useEffect(() => {
    api
      .getCouncilBlogsViewTextContents()
      .then(({ data }) => setCouncilBlogsViewTextContent(data))
      .catch((err) => {
        console.log('Uh-oh! Error occurred while fetching the data from the server.');
        console.log(err);
      });

    api
      .getCouncilBlogPosts()
      .then(({ data }) => {
        setCouncilBlogPosts(data);
        setPostsToShow(data);
      })
      .catch((err) => {
        console.log('Uh-oh! Error occurred while fetching the blogs from the server.');
        console.log(err);
      });
  }, []);

  const handleFilterPosts = (selectedCategory) => {
    let newPostsToShow;
    newPostsToShow = selectedCategory !== 'All' ? councilBlogPosts.filter((_) => _.attributes.post_category === selectedCategory) : councilBlogPosts;
    setSelectedFilterCategory(selectedCategory);
    setPostsToShow(newPostsToShow);
    setCurrentPage(1);
  };

  //Settings for Pagination
  let pageSize = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const currentViewPosts = useMemo(() => {
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

  const renderPosts = (posts) =>
    posts.map(({ attributes }) => {
      const { post_title, post_date, post_author, post_text_brief, post_cover_image } = attributes;
      const { image_file, alternate_text } = post_cover_image;

      return (
        <Post key={post_title}>
          <div className="col-span-2 place-self-center lg:row-auto">
            {image_file.data ? <Post.Img src={image_file.data?.attributes?.url} alt={alternate_text} className="object-cover object-center" /> : null}
          </div>
          <div className="col-span-2 mx-auto flex max-w-2xl flex-col gap-1">
            <Post.Title>{post_title}</Post.Title>
            <Post.Subtitle>{`${post_date ? formatDate(post_date) : ''} ${post_author ? `| ${post_author}` : ``}`}</Post.Subtitle>
            <Post.Text>{post_text_brief}</Post.Text>
            <div className="flex flex-wrap justify-center gap-8 lg:justify-start">
              <Link
                to={`/council-blogs/${post_title}`}
                className="mt-4 gap-2 flex underline underline-offset-4 transition-all hover:decoration-skin-accent hover:opacity-90"
              >
                Show More
              </Link>
            </div>
          </div>
        </Post>
      );
    });

  return (
    <>
      {councilBlogsViewTextContent.length ? (
        <div className="my-8" aria-label="council blogs">
          <Section>
            <Section.Heading>{councilBlogsViewTextContent[0]?.attributes?.section_heading}</Section.Heading>
            <div className="mb-4 flex flex-wrap items-center justify-center gap-4 md:justify-start">{renderFilterButtons()}</div>
            <div className="flex flex-col gap-10">{currentViewPosts.length ? renderPosts(currentViewPosts) : null}</div>
            <Pagination currentPage={currentPage} totalCount={postsToShow.length} pageSize={pageSize} onPageChange={(page) => setCurrentPage(page)} />
          </Section>
        </div>
      ) : null}
    </>
  );
}

CouncilBlogs.displayName = 'CouncilBlogs';

export default CouncilBlogs;
