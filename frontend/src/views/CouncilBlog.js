import React from "react";
import Section from "../components/Section";
import twitterIcon from "../assets/images/social/icon-twitter.svg";
import facebookIcon from "../assets/images/social/icon-facebook.svg";
import api from "../utils/api";

/**
 * The **CouncilBlogs** component renders the view that shows all the council blog posts.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function CouncilBlog() {
  const [blogPost, setBlogPost] = React.useState([]);

  React.useEffect(() => {
    api.getCouncilBlogPost()
      .then(response => setBlogPost(response.data))
      .catch(err => {
        console.log("Uh-oh! Error occurred while fetching the members data from the server.");
        console.log(err);
      });
  }, []);

  const renderDate = (dateString) => {
    const dateParts = dateString.split('-');
    const newDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    const dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return newDate.toLocaleDateString('en-us', dateFormatOptions);
  }

  return (
    <>
      {blogPost.length
        ? (
          <div className="my-8" aria-label="blogs">
            <Section>
              <div className="w-full max-w-2xl mx-auto">
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
                      <a class="w-8 h-8 rounded-full bg-skin-accent flex justify-center items-center hover:opacity-80 transition-all" href="" target="_blank">
                        <img src={twitterIcon} alt="share on twitter" className="h-4 w-4" />
                      </a>
                      <a class="w-8 h-8 rounded-full  bg-skin-accent flex justify-center items-center hover:opacity-80 transition-all" href="" target="_blank">
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

export default CouncilBlog;
