import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import Section from '../components/Section';
import { partnersImagesAnimationVariants } from '../utils/animationVariants';

import api from '../utils/api';

/**
 * The **LogosList** component renders the view that all the different logos of the council.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function LogosList() {
  const [logosViewTextContent, setLogosViewTextContent] = useState([]);

  // Get the text contents of the page
  useEffect(() => {
    api
      .getLogosViewTextContents()
      .then(({ data }) => setLogosViewTextContent(data))
      .catch((err) => {
        console.log('Uh-oh! Error occurred while fetching the data from the server.');
        console.log(err);
      });
  }, []);

  const renderImage = (logo) => {
    if (!logo) {
      return null;
    }

    const { alternate_text, image_file } = logo;
    return (
      <motion.img
        key={alternate_text}
        src={image_file.data.attributes.url}
        alt={alternate_text}
        className="max-h-24 max-w-full object-cover object-center max-h"
        variants={partnersImagesAnimationVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
    );
  };

  return (
    <>
      {logosViewTextContent.length ? (
        <div className="my-8" aria-label="nybc logo page">
          {/* Section # 1 - List of NYBC's logos */}
          <Section>
            <Section.Heading>{logosViewTextContent[0].attributes.section_heading}</Section.Heading>
            <div className="mt-6 grid grid-cols-1 place-items-center gap-14 sm:grid-cols-2 md:grid-cols-3">
              {logosViewTextContent[0].attributes.logos.length ? logosViewTextContent[0].attributes.logos.map((logo) => renderImage(logo)) : null}
            </div>
          </Section>
        </div>
      ) : null}
    </>
  );
}

LogosList.displayName = 'LogosList';

export default LogosList;
