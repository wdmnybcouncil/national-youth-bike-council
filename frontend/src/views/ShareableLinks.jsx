import { useState, useEffect } from 'react';

import Section from '../components/Section';
import PageLink from '../components/PageLink';

import api from '../utils/api';

/**
 * The ShareableLinks component serves as a centralized hub presenting a LinkTree-inspired collection of links dedicated to the National Youth Bike Council (NYBC).
 * @component
 * @returns {React.ReactElement} The ShareableLinks.
 *
 * @version 2.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 *
 * @example
 * <ShareableLinks />
 */
function ShareableLinks() {
  const [shareableLinksViewTextContent, setShareableLinksViewTextContent] = useState([]);
  const [shareableLinks, setShareableLinks] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [copied, setCopied] = useState(false);
  const [inputValue, setInputValue] = useState(''); // Replace with the actual link value

  // Get the text contents of the page
  useEffect(() => {
    api
      .getShareableLinksViewTextContents()
      .then(({ data }) => setShareableLinksViewTextContent(data))
      .catch((err) => {
        console.log('Uh-oh! Error occurred while fetching the data from the server.');
        console.log(err);
      });
  }, []);

  // Get the list of shareable links
  useEffect(() => {
    api
      .getShareableLinks()
      .then(({ data }) => setShareableLinks(data))
      .catch((err) => {
        console.log('Uh-oh! Error occurred while fetching the data from the server.');
        console.log(err);
      });
  }, []);

  // Get the social platforms links for the Footer
  useEffect(() => {
    const socialIconsNotToDisplay = ['discord', 'email'];
    api
      .getSocialMediaLinks()
      .then(({ data }) => setSocialLinks(data.filter((link) => !socialIconsNotToDisplay.includes(link.attributes.link_title.toLowerCase()))))
      .catch((err) => {
        console.log('Uh-oh! Error occurred while fetching the data from the server.');
        console.log(err);
      });
  }, []);

  // Get the page url and copy it in the readonly textbox
  useEffect(() => {
    setInputValue(window.location.href);
  }, []);

  const renderSocialLinks = (links) => {
    return links.map((link) => {
      const { link_title, type_of_link = 'external', link_url, link_icon = {} } = link.attributes;
      const { image_file = {}, alternate_text = '' } = link_icon;

      return (
        <PageLink
          key={link_title}
          type={type_of_link}
          linkTo={link_url}
          className="mt-0 w-8 h-8 flex justify-center items-center bg-skin-fill-accent no-underline rounded-full hover:opacity-80 transition-all"
        >
          {Object.keys(link_icon).length ? (
            <img src={image_file.data.attributes.url} alt={alternate_text} className="w-6 h-6 rounded-full flex justify-center items-center" />
          ) : null}
        </PageLink>
      );
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(inputValue)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 4000); // Reset 'copied' state after 3 seconds
      })
      .catch((err) => {
        console.error('Unable to copy:', err);
      });
  };

  const renderLinks = () =>
    shareableLinks.map((link, index) => {
      const { section_title, section_links } = link.attributes;

      return (
        <div key={index} className="mx-auto p-4 w-full max-w-2xl">
          {section_title ? <h2 className="mb-4 text-center font-semibold">{section_title}</h2> : null}
          <ul className="list-none flex flex-col gap-2">
            {section_links.map((link) => {
              const { title, url, image } = link;
              return (
                <li
                  key={title}
                  className="h-16 rounded-lg overflow-hidden bg-skin-fill-card-accent text-skin-accent text-center text-sm font-semibold transition hover:bg-skin-fill-accent hover:text-skin-muted focus:bg-skin-fill-accent focus:text-skin-muted flex items-center"
                >
                  <a href={url} target="_blank" rel="noopener noreferrer" className="no-underline w-full h-full flex items-center gap-4">
                    {image ? (
                      <img
                        src={image.image_file.data.attributes.url}
                        alt={image.alternate_text}
                        className="ml-2 sm:ml-0 h-full w-full max-w-[50px] sm:max-w-[80px]"
                      />
                    ) : (
                      <p className="ml-2 sm:ml-0 h-full w-full max-w-[50px] sm:max-w-[80px] text-3xl flex items-center justify-center">&infin;</p>
                    )}
                    <span className="block w-full p-2">{title}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      );
    });

  return (
    <>
      {shareableLinksViewTextContent.length > 0 ? (
        <div className="my-8 flex justify-center" aria-label="shareable links page">
          <div className="w-full max-w-3xl">
            <Section>
              {/* Heading of the page */}
              <Section.Heading>{shareableLinksViewTextContent[0].attributes.section_title}</Section.Heading>
              {/* Description of the page, if any */}
              <Section.Text>{shareableLinksViewTextContent[0].attributes.section_text}</Section.Text>
              {/* Social Media Icons */}
              <div className="flex gap-4 justify-center">{socialLinks.length > 0 ? renderSocialLinks(socialLinks) : null}</div>
              {/* List of page links to share */}
              {shareableLinks.length > 0 ? renderLinks() : null}
              {/* Copy the link input */}
              <div className="mx-auto my-4 p-4 w-full max-w-2xl flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row rounded-lg overflow-hidden border border-skin-accent">
                  <input type="text" value={inputValue} readOnly className="w-full p-2 border-0 text-sm bg-slate-50" />
                  <button
                    onClick={copyToClipboard}
                    className="w-full sm:max-w-[100px] p-2 bg-skin-fill-card-accent text-skin-accent text-center text-sm font-semibold transition hover:bg-skin-fill-accent hover:text-skin-muted focus:bg-skin-fill-accent focus:text-skin-muted"
                  >
                    {copied ? 'Copied!' : 'Copy Link'}
                  </button>
                </div>
              </div>
            </Section>
          </div>
        </div>
      ) : null}
    </>
  );
}

ShareableLinks.displayName = 'ShareableLinks';

export default ShareableLinks;
