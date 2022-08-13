import React from "react";
import PropTypes from "prop-types";
import Section from "./Section";
import logoImage from "../assets/images/icon-logo.png";

/**
 * The **DescriptionCard** component renders a card for with description of different roles in the council.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function DescriptionCard({ heading, text, image = '' }) {
  const [cardImg, setCardImg] = React.useState(logoImage);

  return (
    <div className="group w-full max-w-xs rounded-lg bg-gray-100 p-4 flex flex-col justify-center items-center" onMouseEnter={() => setCardImg(image)} onMouseLeave={() => setCardImg(logoImage)}>
      {image &&
        <img
          src={cardImg}
          alt={heading}
          className="-mt-12 h-16 w-16 max-w-full rounded-full border-2 border-skin-accent object-center object-cover transition-all group-hover:scale-125" />
      }
      <h3 className="mt-4 mb-4 w-full max-w-4xl text-center border-b border-skin-primary pb-1 font-balgin text-xl tracking-wider text-skin-primary transition-all">
        {heading}
      </h3>
      <Section.Text>{text}</Section.Text>
    </div>
  );
}

const propTypes = {
  heading: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  image: PropTypes.string,
};

DescriptionCard.displayName = "DescriptionCard";
DescriptionCard.protoTypes = propTypes;

export default DescriptionCard;