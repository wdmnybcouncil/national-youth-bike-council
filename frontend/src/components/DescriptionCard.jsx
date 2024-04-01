import { useState } from 'react';
import PropTypes from 'prop-types';
import Section from './Section';
import logoImage from '../assets/images/icon-logo.png';

/**
 * The **DescriptionCard** component renders a card for with description of different roles in the council.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function DescriptionCard({ heading, text, enableAnimation = false, image = '' }) {
  const [cardImg, setCardImg] = useState(enableAnimation ? logoImage : image);

  const renderCardContent = () => (
    <>
      {image && (
        <img
          src={cardImg}
          alt={heading}
          className="-mt-12 h-16 w-16 max-w-full rounded-full border-2 border-skin-accent object-center object-cover transition-all group-hover:scale-125"
        />
      )}
      <h3 className="mt-4 mb-4 w-full text-center border-b border-skin-primary pb-1 font-kaleko font-bold tracking-wide text-xl text-skin-primary transition-all">
        {heading}
      </h3>
      <Section.Text>{text}</Section.Text>
    </>
  );

  return (
    <>
      {enableAnimation ? (
        <div
          className="group min-w-[320px] max-w-xs rounded-lg bg-gray-100 p-4 flex flex-col justify-center items-center"
          onMouseEnter={() => setCardImg(image)}
          onMouseLeave={() => setCardImg(logoImage)}
        >
          {renderCardContent()}
        </div>
      ) : (
        <div className="group min-w-[320px] max-w-xs rounded-lg bg-gray-100 p-4 flex flex-col justify-center items-center"> {renderCardContent()}</div>
      )}
    </>
  );
}

const propTypes = {
  heading: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  image: PropTypes.string,
  enableAnimation: PropTypes.bool,
};

DescriptionCard.displayName = 'DescriptionCard';
DescriptionCard.protoTypes = propTypes;

export default DescriptionCard;
