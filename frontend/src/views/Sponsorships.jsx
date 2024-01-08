import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Section from '../components/Section';
import { partnersImagesAnimationVariants } from '../utils/animationVariants';
import api from '../utils/api';

/**
 * The **Sponsorships** component renders the view that all the grants, sponsorships and awards of the council.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function Sponsorships({ sponsors }) {
  const [sponsorshipsViewTextContent, setSponsorshipsViewTextContent] = useState([]);

  // Get the text contents of the page
  useEffect(() => {
    api
      .getSponsorshipsViewTextContents()
      .then(({ data }) => setSponsorshipsViewTextContent(data))
      .catch((err) => {
        console.log('Uh-oh! Error occurred while fetching the data from the server.');
        console.log(err);
      });
  }, []);

  const renderImage = (logo, name) => {
    if (!logo) {
      if (!name) {
        return null;
      }
      // If there is no logo, render name
      return (
        <motion.p
          key={name}
          className="bg-skin-fill-accent p-4 text-center text-lg font-semibold tracking-wide text-skin-muted md:text-xl"
          variants={partnersImagesAnimationVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {name}
        </motion.p>
      );
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
      {sponsorshipsViewTextContent.length ? (
        <div className="my-8" aria-label="sponsorships page">
          {/* Section # 1 - Grants - Sponsorships - Awards */}
          <Section>
            <Section.Heading>{sponsorshipsViewTextContent[1].attributes.section_heading}</Section.Heading>
            <div className="mt-6 grid grid-cols-1 place-items-center gap-14 sm:grid-cols-2 md:grid-cols-3">
              {sponsors.length
                ? sponsors.map((sponsor) => {
                    const { sponsor_logo, sponsor_name } = sponsor.attributes;
                    return renderImage(sponsor_logo, sponsor_name);
                  })
                : null}
            </div>
          </Section>
        </div>
      ) : null}
    </>
  );
}

const propTypes = {
  sponsors: PropTypes.array.isRequired,
};

Sponsorships.displayName = 'Sponsorships';
Sponsorships.propTypes = propTypes;

export default Sponsorships;
