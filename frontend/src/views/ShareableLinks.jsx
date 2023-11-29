import { useState, useEffect } from 'react';
import clsx from 'clsx';

import Section from '../components/Section';

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
                  className="h-12 rounded-lg overflow-hidden bg-skin-fill-card-accent text-skin-accent text-center text-sm font-semibold transition hover:bg-skin-fill-accent hover:text-skin-muted focus:bg-skin-fill-accent focus:text-skin-muted flex items-center"
                >
                  <a href={url} target="_blank" rel="noopener noreferrer" className="no-underline w-full h-full flex items-center gap-4">
                    {image ? <img src={image.image_file.data.attributes.url} alt={image.alternate_text} className="h-full w-full max-w-[80px]" /> : null}
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
          </Section>
        </div>
      ) : null}
    </>
  );
}

ShareableLinks.displayName = 'ShareableLinks';

export default ShareableLinks;
