import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Section from '../components/Section';

import { formatDate, getTwitterHref, getFacebookHref } from '../utils/commonUtils';
import api from '../utils/api';

/**
 * The **CouncilBlog** component renders the view that a specific blog post.
 * @returns {React.ReactElement} The CouncilBlog.
 *
 * @version 2.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 *
 * @example
 * <CouncilBlog />
 */
function CouncilBlog() {
  const { blogTitle } = useParams();
  const navigate = useNavigate();
  const [blogPost, setBlogPost] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    api
      .getCouncilBlogPost(blogTitle)
      .then(({ data }) => setBlogPost(data))
      .catch((err) => {
        console.log('Uh-oh! Error occurred while fetching the blogs from the server.');
        console.log(err);
      });
  }, [blogTitle]);

  // Get the social platforms links for the Footer
  useEffect(() => {
    api
      .getSocialMediaLinks()
      .then(({ data }) => setSocialLinks(data))
      .catch((err) => {
        console.log('Uh-oh! Error occurred while fetching the data from the server.');
        console.log(err);
      });
  }, []);

  const handleBackButtonClick = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/council-blogs', { replace: true });
    }
  };

  const getSocialMediaIcon = (title) => socialLinks.filter((link) => link.attributes.link_title.toLowerCase() === title)[0];

  return (
    <>
      {blogPost.length ? (
        <div className="my-8" aria-label="blogs">
          <Section>
            <div className="w-full max-w-2xl mx-auto">
              <button
                type="button"
                className="rounded-full py-2 px-8 mb-4 text-center text-sm font-semibold transition hover:bg-skin-fill-accent hover:text-skin-muted focus:bg-skin-fill-accent focus:text-skin-muted bg-skin-fill-card-accent text-skin-accent"
                onClick={handleBackButtonClick}
              >
                &#8592; Go to Council Blogs
              </button>
              <Section.Heading>{blogPost[0].attributes.post_title}</Section.Heading>
              <div className="flex flex-col gap-4">
                <Section.Text className="text-sm">
                  {`${blogPost[0].attributes.post_date ? formatDate(blogPost[0].attributes.post_date) : ''} ${
                    blogPost[0].attributes.post_author ? `| ${blogPost[0].attributes.post_author}` : ``
                  }`}
                </Section.Text>
                {blogPost[0].attributes.post_tags?.length ? <Section.Tags>{blogPost[0].attributes.post_tags}</Section.Tags> : null}
                <Section.Img
                  src={blogPost[0].attributes.post_cover_image.image_file.data.attributes.url}
                  alt={blogPost[0].attributes.post_cover_image.alternate_text}
                  className="rounded-md border-4 border-skin-accent object-cover object-center"
                />
                <Section.Text>{blogPost[0].attributes.post_text_detail}</Section.Text>
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <a
                      className="w-8 h-8 rounded-full bg-skin-accent flex justify-center items-center hover:opacity-80 transition-all"
                      href={getTwitterHref(blogTitle, window.location.href)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {socialLinks.length ? (
                        <img src={getSocialMediaIcon('x').attributes.link_icon.image_file.data.attributes.url} alt="share on X" className="h-4 w-4" />
                      ) : null}
                    </a>
                    <a
                      className="w-8 h-8 rounded-full bg-skin-accent flex justify-center items-center hover:opacity-80 transition-all"
                      href={getFacebookHref(window.location.href)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {socialLinks.length ? (
                        <img
                          src={getSocialMediaIcon('facebook').attributes.link_icon.image_file.data.attributes.url}
                          alt="share on facebook"
                          className="h-4 w-4"
                        />
                      ) : null}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </div>
      ) : null}
    </>
  );
}

CouncilBlog.displayName = 'CouncilBlog';

export default CouncilBlog;
