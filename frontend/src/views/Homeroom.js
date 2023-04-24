import React from 'react';
import Section from '../components/Section';

/**
 * The **Homeroom** component renders the educational material of the council.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function Homeroom() {
  return (
    <div className="my-8" aria-label="resources page">
      <Section>
        <Section.Heading>Homeroom</Section.Heading>
      </Section>
    </div>
  );
}

Homeroom.displayName = 'Homeroom';

export default Homeroom;
