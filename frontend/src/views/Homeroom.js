import { useState, useEffect, useMemo } from 'react';
import Section from '../components/Section';
import FilterButton from '../components/FilterButton';
import Post from '../components/Post/Post';
import PageLink from '../components/PageLink';
import Pagination from '../components/Pagination';
import api from '../utils/api';
import { formatDate } from '../utils/commonUtils';

/**
 * The **Homeroom** component renders the educational material of the council.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function Homeroom() {
  const [homeroomViewTextContent, setHomeroomViewTextContent] = useState([]);
  const [homeroomPosts, setHomeroomPosts] = useState([]);

  //Settings for Filtering Posts
  const [postsToShow, setPostsToShow] = useState([]);
  const [selectedFilterCategory, setSelectedFilterCategory] = useState('All');
  const filterTagsForPosts = ['All', ...new Set(homeroomPosts.map((_) => _.attributes.post_title.trim()[0]))];

  // Get the text contents of the page
  useEffect(() => {
    api.getHomeroomViewTextContents()
      .then(({ data }) =>
        setHomeroomViewTextContent(data))
      .catch(err => {
        console.log('Uh-oh! Error occurred while fetching the data from the server.');
        console.log(err);
      });

    api.getHomeroomPosts()
      .then(({ data }) => {
        setHomeroomPosts(data);
        setPostsToShow(data);
      })
      .catch(err => {
        console.log("Uh-oh! Error occurred while fetching the posts from the server.");
        console.log(err);
      });
  }, []);

  const handleFilterPosts = (selectedCategory) => {
    let newPostsToShow;
    newPostsToShow = (selectedCategory !== 'All')
      ? homeroomPosts.filter((_) => _.attributes.post_title.trim()[0] === selectedCategory)
      : homeroomPosts;
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
    return filterTagsForPosts.sort().map((filterTag) => (
      <FilterButton key={filterTag} filterCategory={filterTag} selectedFilterCategory={selectedFilterCategory} handleFilter={handleFilterPosts} />
    ));
  };

  const renderPostLinks = ({ social_media_post, article, video, pdf }) => {
    const pdfLink = pdf.data.attributes.url;
    const pdfName = pdf.data.attributes.name.split('.')[0];
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
        {pdfLink && (
          <PageLink key={pdfName} type="external" className="mt-4" linkTo={pdfLink}>
            {pdfName}
          </PageLink>
        )}
      </>
    );
  };

  const renderPosts = (posts) =>
    posts.map(({ attributes }) => {
      const { post_title, post_date, post_text, post_image, post_links } = attributes;
      const { image_file, alternate_text } = post_image;
      return (
        <Post key={post_title}>
          <div className="col-span-2 place-self-center lg:row-auto">
            <Post.Img src={image_file?.data.attributes.url} alt={alternate_text} className="object-cover object-center" />
          </div>
          <div className="col-span-2 mx-auto flex max-w-2xl flex-col gap-1">
            <Post.Title>{post_title}</Post.Title>
            <Post.Subtitle>{post_date ? formatDate(post_date) : ''}</Post.Subtitle>
            <Post.Text>{post_text}</Post.Text>
            <div className="flex flex-wrap justify-center gap-8 lg:justify-start">{renderPostLinks(post_links)}</div>
          </div>
        </Post>
      );
    });

  return (
    <>
      {homeroomPosts.length
        ? (
          <div className="my-8" aria-label="media coverage page">
            <Section>
              <Section.Heading>
                {homeroomViewTextContent[0].attributes.section_heading}
              </Section.Heading>
              <Section.Text>
                {homeroomViewTextContent[0].attributes.section_description}
              </Section.Text>
              <div className="mt-6 mb-4 flex flex-wrap items-center justify-center gap-4 md:justify-start">{renderFilterButtons()}</div>
              <div className="flex flex-col gap-10">{renderPosts(currentViewPosts)}</div>
              <Pagination currentPage={currentPage} totalCount={postsToShow.length} pageSize={pageSize} onPageChange={(page) => setCurrentPage(page)} />
            </Section>
          </div>
        )
        : null}
    </>
  );
}

Homeroom.displayName = 'Homeroom';

export default Homeroom;

