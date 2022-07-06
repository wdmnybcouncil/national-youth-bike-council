import React from "react";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import Section from "../components/Section";
import geoUrl from "../constants/usa-map";

/**
 * The **WhereAreWe** component renders the view that shows the places where the council is present.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function WhereAreWe({ whereAreWeView }) {
  const [content, setContent] = React.useState("");
  return (
    <div className="my-8" aria-label="where are we page">
      <Section>
        <Section.Heading>{whereAreWeView[0].heading}</Section.Heading>
        <div className="flex items-center justify-center">
          <ComposableMap projection="geoAlbers" projectionConfig={{ scale: 1000 }} className="max-h-[700px] max-w-full">
            <Geographies geography={geoUrl}>
              {({ geographies }) => geographies.map((geo) =>
                <Geography key={geo.rsmKey} geography={geo} fill="#f6f6f6" stroke="#bad2e8" style={{
                  default: { outline: "none" },
                  hover: { outline: "none" },
                  pressed: { outline: "none" },
                }} />)}
            </Geographies>
            {whereAreWeView[0].mapMarkers.map(({ name, coordinates }) => (
              <Marker
                key={name}
                coordinates={coordinates}
                onMouseEnter={() => setContent(`${name}`)} onMouseLeave={() => setContent("")}>
                <circle r={8} fill="#f58020" stroke="#3f5b74" strokeWidth={1} data-tip="" />
              </Marker>
            ))}
          </ComposableMap>
          <ReactTooltip backgroundColor="#3F5B74">{content}</ReactTooltip>
        </div>
      </Section>
    </div>
  );
}

const propTypes = {
  whereAreWeView: PropTypes.array.isRequired,
};

WhereAreWe.displayName = "WhereAreWe";
WhereAreWe.propTypes = propTypes;

export default WhereAreWe;
