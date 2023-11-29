import { useState, useEffect } from 'react';

import Section from '../components/Section';

import { getTwitterHref, getFacebookHref } from '../utils/commonUtils';
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
    api
      .getSocialMediaLinks()
      .then(({ data }) => setSocialLinks(data))
      .catch((err) => {
        console.log('Uh-oh! Error occurred while fetching the data from the server.');
        console.log(err);
      });
  }, []);

  // Get the page url and copy it in the readonly textbox
  useEffect(() => {
    setInputValue(window.location.href);
  }, []);

  const getSocialMediaIcon = (title) => socialLinks.filter((link) => link.attributes.link_title.toLowerCase() === title)[0];

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
        <div key={index} className="mx-auto my-4 p-4 w-full max-w-2xl">
          {section_title ? <h2 className="mb-4 text-center font-semibold">{section_title}</h2> : null}
          <ul className="list-none flex flex-col gap-2">
            {section_links.map((link) => {
              const { title, url, image } = link;
              return (
                <li
                  key={title}
                  className="min-h-12 rounded-lg overflow-hidden bg-skin-fill-card-accent text-skin-accent text-center text-sm font-semibold transition hover:bg-skin-fill-accent hover:text-skin-muted focus:bg-skin-fill-accent focus:text-skin-muted flex items-center"
                >
                  <a href={url} target="_blank" rel="noopener noreferrer" className="no-underline w-full h-full flex items-center gap-4">
                    {image ? (
                      <img
                        src={image.image_file.data.attributes.url}
                        alt={image.alternate_text}
                        className="ml-2 sm:ml-0 h-full w-full max-w-[50px] sm:max-w-[80px]"
                      />
                    ) : null}
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
        <div className="my-8" aria-label="advisor page">
          <Section>
            <Section.Heading>{shareableLinksViewTextContent[0].attributes.section_title}</Section.Heading>
            <Section.Text>{shareableLinksViewTextContent[0].attributes.section_text}</Section.Text>
            {shareableLinks.length > 0 ? renderLinks() : null}
            <div className="mx-auto my-4 p-4 w-full max-w-2xl flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row rounded-lg overflow-hidden border border-skin-accent">
                <input type="text" value={inputValue} readOnly className="w-full p-2 border-0 text-sm" />
                <button
                  onClick={copyToClipboard}
                  className="w-full sm:max-w-[100px] p-2 bg-skin-fill-card-accent text-skin-accent text-center text-sm font-semibold transition hover:bg-skin-fill-accent hover:text-skin-muted focus:bg-skin-fill-accent focus:text-skin-muted"
                >
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <a
                    className="w-8 h-8 rounded-full bg-skin-accent flex justify-center items-center hover:opacity-80 transition-all"
                    href={getTwitterHref(shareableLinksViewTextContent[0].attributes.section_title, window.location.href)}
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
          </Section>
        </div>
      ) : null}
    </>
  );
}

ShareableLinks.displayName = 'ShareableLinks';

export default ShareableLinks;
