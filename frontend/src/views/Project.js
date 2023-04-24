import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Section from '../components/Section';
import twitterIcon from '../assets/images/social/icon-twitter.svg';
import facebookIcon from '../assets/images/social/icon-facebook.svg';
import api from '../utils/api';
import { getTwitterHref, getFacebookHref } from '../utils/commonUtils';

/**
 * The **Project** component renders the view that a specific project post.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function Project() {
  const { projectTitle } = useParams();
  const navigate = useNavigate();
  const [projectPost, setProjectPost] = useState([]);

  useEffect(() => {
    api.getProjectPost(projectTitle)
      .then(({ data }) => setProjectPost(data))
      .catch(err => {
        console.log('Uh-oh! Error occurred while fetching the data from the server.');
        console.log(err);
      });
  }, [projectTitle]);

  const handleBackButtonClick = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/projects', { replace: true });
    }
  }

  return (
    <>
      {projectPost.length
        ? (
          <div className="my-8" aria-label="blogs">
            <Section>
              <div className="w-full max-w-2xl mx-auto">
                <button
                  type="button"
                  className="rounded-full py-2 px-8 mb-4 text-center text-sm font-semibold transition hover:bg-skin-fill-accent hover:text-skin-muted focus:bg-skin-fill-accent focus:text-skin-muted bg-skin-fill-card-accent text-skin-accent"
                  onClick={handleBackButtonClick}
                >
                  &#8592; Go to Projects
                </button>
                <Section.Heading>{projectPost[0].attributes.project_title}</Section.Heading>
                <div className="flex flex-col gap-4">
                  <Section.Text className="text-sm">
                    {`Project Status: ${projectPost[0].attributes.project_status}`}
                  </Section.Text>
                  <Section.Img
                    src={projectPost[0].attributes.project_cover_image.image_file.data.attributes.url}
                    alt={projectPost[0].attributes.project_cover_image.alternate_text}
                    className="rounded-md border-4 border-skin-accent object-cover object-center" />
                  <Section.Text>{projectPost[0].attributes.project_announcement}</Section.Text>
                  <div className="flex justify-between">
                    <div className="flex gap-4">
                      <a
                        className="w-8 h-8 rounded-full bg-skin-accent flex justify-center items-center hover:opacity-80 transition-all"
                        href={getTwitterHref(projectTitle, window.location.href)}
                        target="_blank"
                        rel="noreferrer" >
                        <img src={twitterIcon} alt="share on twitter" className="h-4 w-4" />
                      </a>
                      <a
                        className="w-8 h-8 rounded-full bg-skin-accent flex justify-center items-center hover:opacity-80 transition-all"
                        href={getFacebookHref(window.location.href)}
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

Project.displayName = 'Project';

export default Project;
