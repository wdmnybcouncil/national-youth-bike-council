import React from "react";
import PropTypes from "prop-types";
import Section from "../components/Section";

/**
 * The **Sponsorships** component renders the view that all the partners, grants, sponsorships and awards of the council.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function Sponsorships({ sponsorshipsView }) {
  const { partners } = sponsorshipsView[0];
  const { sponsorships } = sponsorshipsView[1];

  const renderImages = (arr) => {
    return arr.map(({ img, text }) => {
      if (img.src === "" || img.src === undefined) {
        if (text === "" || text === undefined) {
          return null;
        }
        return (
          <p key={text} className="p-4 bg-skin-fill-accent text-skin-muted font-semibold text-lg text-center md:text-xl tracking-wide">{text}</p>
        );
      }
      return (
        <img key={img.alt} src={img.src} alt={img.alt} className="max-w-full max-h-28 object-cover object-center" />
      );
    });
  }

  return (
    <>
      {/* Section # 1 - Partner */}
      <Section>
        <Section.Heading>{sponsorshipsView[0].heading}</Section.Heading>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 place-items-center">
          {partners.length && renderImages(partners)}
        </div>
      </Section>
      {/* Section # 2 - Grants - Sponsorships - Awards */}
      <Section>
        <Section.Heading>{sponsorshipsView[1].heading}</Section.Heading>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 place-items-center">
          {sponsorships.length && renderImages(sponsorships)}
        </div>
      </Section>
    </>
  );
}

const propTypes = {
  sponsorshipsView: PropTypes.array.isRequired,
};

Sponsorships.displayName = "Sponsorships";
Sponsorships.propTypes = propTypes;

export default Sponsorships;