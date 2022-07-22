import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Section from "../components/Section";
import twitterIcon from "../assets/images/social/icon-twitter.svg";
import facebookIcon from "../assets/images/social/icon-facebook.svg";
import api from "../utils/api";

/**
 * The **CouncilBlog** component renders the view that a specific blog post.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function CouncilBlog() {
  const { blogTitle } = useParams();
  const navigate = useNavigate();
  const [blogPost, setBlogPost] = React.useState([]);

  React.useEffect(() => {
    api.getCouncilBlogPost(blogTitle)
      .then(response => setBlogPost(response.data))
      .catch(err => {
        console.log("Uh-oh! Error occurred while fetching the members data from the server.");
        console.log(err);
      });
  }, [blogTitle]);

  const renderDate = (dateString) => {
    const dateParts = dateString.split('-');
    const newDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    const dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return newDate.toLocaleDateString('en-us', dateFormatOptions);
  }

  const getTwitterHref = () => {
    const tweetContent = `${blogTitle} ${window.location.href} @National_ybc #nybc #national_youth_bike_council`;
    const urlEncodedMsg = encodeURIComponent(tweetContent);
    return `https://twitter.com/intent/tweet?text=${urlEncodedMsg}`;
  }

  const getFacebookHref = () => {
    const facebookPostContent = `${window.location.href}`;
    const urlEncodedMsg = encodeURIComponent(facebookPostContent);
    return `https://www.facebook.com/sharer/sharer.php?u=${urlEncodedMsg}`;
  }

  const handleBackButtonClick = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/council-blogs', { replace: true });
    }
  }

  return (
    <>
      {blogPost.length
        ? (
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
                    {`${blogPost[0].attributes.post_date ? renderDate(blogPost[0].attributes.post_date) : ''} | ${blogPost[0].attributes.post_author}`}
                  </Section.Text>
                  <Section.Tags>{blogPost[0].attributes.post_tags}</Section.Tags>
                  <Section.Img
                    src={blogPost[0].attributes.post_cover_image.image_file.data.attributes.url}
                    alt={blogPost[0].attributes.post_cover_image.alternate_text}
                    className="rounded-md border-4 border-skin-accent object-cover object-center" />
                  <Section.Text>{blogPost[0].attributes.post_text_detail}</Section.Text>
                  <div className="flex justify-between">
                    <div className="flex gap-4">
                      <a
                        className="w-8 h-8 rounded-full bg-skin-accent flex justify-center items-center hover:opacity-80 transition-all"
                        href={getTwitterHref()}
                        target="_blank"
                        rel="noreferrer" >
                        <img src={twitterIcon} alt="share on twitter" className="h-4 w-4" />
                      </a>
                      <a
                        className="w-8 h-8 rounded-full bg-skin-accent flex justify-center items-center hover:opacity-80 transition-all"
                        href={getFacebookHref()}
                        target="_blank"
                        rel="noreferrer" >
                        <img src={facebookIcon} alt="share on facebook" className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Section>
          </div >
        )
        : null
      }
    </>
  );
}

CouncilBlog.displayName = "CouncilBlog";

export default CouncilBlog;
