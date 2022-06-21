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
          <p key={text} className="bg-skin-fill-accent p-4 text-center text-lg font-semibold tracking-wide text-skin-muted md:text-xl">
            {text}
          </p>
        );
      }
      return <img key={img.alt} src={img.src} alt={img.alt} className="max-h-28 max-w-full object-cover object-center" />;
    });
  };

  return (
    <>
      {/* Section # 1 - Partner */}
      <Section>
        <Section.Heading>{sponsorshipsView[0].heading}</Section.Heading>
        <div className="mt-6 grid grid-cols-1 place-items-center gap-14 sm:grid-cols-2 md:grid-cols-3">{partners.length && renderImages(partners)}</div>
      </Section>
      {/* Section # 2 - Grants - Sponsorships - Awards */}
      <Section>
        <Section.Heading>{sponsorshipsView[1].heading}</Section.Heading>
        <div className="mt-6 grid grid-cols-1 place-items-center gap-14 sm:grid-cols-2 md:grid-cols-3">{sponsorships.length && renderImages(sponsorships)}</div>
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
