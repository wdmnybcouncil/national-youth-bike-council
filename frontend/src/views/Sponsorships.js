import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import Section from "../components/Section";
import { partnersImagesAnimationVariants } from "../utils/animationVariants";
import api from "../utils/api";

/**
 * The **Sponsorships** component renders the view that all the partners, grants, sponsorships and awards of the council.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function Sponsorships({ sponsors, partners }) {
  const [sponsorshipsViewTextContent, setSponsorshipsViewTextContent] = React.useState([]);

  // Get the text contents of the page
  React.useEffect(() => {
    api.getSponsorshipsViewTextContents()
      .then(response => setSponsorshipsViewTextContent(response.data))
      .catch(err => {
        console.log("Uh-oh! Error occurred while fetching the members data from the server.");
        console.log(err);
      });
  }, []);

  const renderImage = (logo, name) => {
    if (!logo) {
      if (!name) {
        return null;
      }
      return (
        <motion.p
          key={name}
          className="bg-skin-fill-accent p-4 text-center text-lg font-semibold tracking-wide text-skin-muted md:text-xl"
          variants={partnersImagesAnimationVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}>
          {name}
        </motion.p>
      );
    }
    const { alternate_text, image_file } = logo;
    return <motion.img
      key={alternate_text}
      src={image_file.data.attributes.url}
      alt={alternate_text}
      className="max-h-28 max-w-full object-cover object-center"
      variants={partnersImagesAnimationVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    />;
  };

  return (
    <>
      {sponsorshipsViewTextContent.length
        ? (
          <div className="my-8" aria-label="sponsorships and partners page">
            {/* Section # 1 - Partner */}
            <Section>
              <Section.Heading>{sponsorshipsViewTextContent[0].attributes.section_heading}</Section.Heading>
              <div className="mt-6 grid grid-cols-1 place-items-center gap-14 sm:grid-cols-2 md:grid-cols-3">
                {partners.length
                  ? partners.map((partner) => {
                    const { partner_logo, partner_name } = partner.attributes;
                    return renderImage(partner_logo, partner_name);
                  })
                  : null}
              </div>
            </Section>
            {/* Section # 2 - Grants - Sponsorships - Awards */}
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
        )
        : null}
    </>
  );
}

const propTypes = {
  sponsors: PropTypes.array.isRequired,
  partners: PropTypes.array.isRequired,
};

Sponsorships.displayName = "Sponsorships";
Sponsorships.propTypes = propTypes;

export default Sponsorships;
