import React from "react";
import PropTypes from "prop-types";
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
  return (
    <Section>
      <Section.Heading>{whereAreWeView[0].heading}</Section.Heading>
      <div className="flex items-center justify-center">
        <ComposableMap projection="geoAlbers" projectionConfig={{ scale: 1000 }} className="max-h-[700px] max-w-full">
          <Geographies geography={geoUrl}>
            {({ geographies }) => geographies.map((geo) => <Geography key={geo.rsmKey} geography={geo} fill="#f6f6f6" stroke="#bad2e8" />)}
          </Geographies>
          {whereAreWeView[0].mapMarkers.map(({ name, coordinates, markerOffset }) => (
            <Marker key={name} coordinates={coordinates}>
              <circle r={8} fill="#f58020" stroke="#3f5b74" strokeWidth={1} />
              <text textAnchor="left" y={markerOffset} style={{ fontFamily: "Livvic", fontSize: "16px", fill: "#3f5b74" }}>
                {name}
              </text>
            </Marker>
          ))}
        </ComposableMap>
      </div>
    </Section>
  );
}

const propTypes = {
  whereAreWeView: PropTypes.array.isRequired,
};

WhereAreWe.displayName = "WhereAreWe";
WhereAreWe.propTypes = propTypes;

export default WhereAreWe;
