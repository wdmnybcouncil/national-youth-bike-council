import { useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import Section from '../components/Section';
import geoUrl from '../constants/usa-map';
import api from '../utils/api';

/**
 * The **WhereAreWe** component renders the view that shows the places where the council is present.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function WhereAreWe() {
  const [content, setContent] = useState('');
  const [placeMarkers, setPlaceMarkers] = useState([]);
  const [whereAreWeViewTextContent, setWhereAreWeViewTextContent] = useState([]);

  useEffect(() => {
    // Get all the places to be shown on the USA map
    api
      .getPlaceMarkers()
      .then(({ data }) => setPlaceMarkers(data))
      .catch((err) => {
        console.log('Uh-oh! Error occurred while fetching the data from the server.');
        console.log(err);
      });

    // Get the text contents of the page
    api
      .getWhereAreWeViewTextContents()
      .then(({ data }) => setWhereAreWeViewTextContent(data))
      .catch((err) => {
        console.log('Uh-oh! Error occurred while fetching the data from the server.');
        console.log(err);
      });
  }, []);

  return (
    <>
      {whereAreWeViewTextContent.length ? (
        <div className="my-8" aria-label="where are we page">
          <Section>
            <Section.Heading>{whereAreWeViewTextContent[0].attributes.section_heading}</Section.Heading>
            <div className="flex items-center justify-center">
              <ComposableMap projection="geoAlbers" projectionConfig={{ scale: 1000 }} className="max-h-[700px] max-w-full">
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#f6f6f6"
                        stroke="#bad2e8"
                        style={{
                          default: { outline: 'none' },
                          hover: { outline: 'none' },
                          pressed: { outline: 'none' },
                        }}
                      />
                    ))
                  }
                </Geographies>
                {placeMarkers.length
                  ? placeMarkers.map((marker) => {
                      const { place_name, place_longitude, place_latitude } = marker.attributes;
                      return (
                        <Marker
                          key={place_name}
                          coordinates={[place_longitude, place_latitude]}
                          onMouseEnter={() => setContent(`${place_name}`)}
                          onMouseLeave={() => setContent('')}
                        >
                          <circle r={8} fill="#f58020" stroke="#3f5b74" strokeWidth={1} data-tip="" />
                        </Marker>
                      );
                    })
                  : null}
              </ComposableMap>
              <ReactTooltip backgroundColor="#3F5B74">{content}</ReactTooltip>
            </div>
          </Section>
        </div>
      ) : null}
    </>
  );
}

WhereAreWe.displayName = 'WhereAreWe';

export default WhereAreWe;
