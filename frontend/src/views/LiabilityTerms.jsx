import { useState, useEffect } from 'react';
import Section from '../components/Section';
import api from '../utils/api';
import { getRandomArrayItem } from '../utils/commonUtils';

/**
 * The **LiabilityTerms** component renders the liability terms of the council.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function LiabilityTerms() {
  const [liabilityTermsViewTextContent, setLiabilityTermsViewTextContent] = useState([]);
  const [codesList, setCodesList] = useState([]);
  const [agreementCode, setAgreementCode] = useState('Check the checkbox above & click on button to generate code');
  const [hasUserReadTerms, setHasUserReadTerms] = useState(false);

  // Get the text contents of the page
  useEffect(() => {
    api
      .getLiabilityTermTextContents()
      .then(({ data }) => setLiabilityTermsViewTextContent(data))
      .catch((err) => {
        console.log('Uh-oh! Error occurred while fetching the data from the server.');
        console.log(err);
      });
  }, []);

  // Get the list of agreement codes
  useEffect(() => {
    api
      .getAgreementCodesList()
      .then(({ data }) => setCodesList(data[0].attributes.section_codes_list))
      .catch((err) => {
        console.log('Uh-oh! Error occurred while fetching the data from the server.');
        console.log(err);
      });
  }, []);

  // Reset the agreement code text
  useEffect(() => {
    if (!hasUserReadTerms) {
      setAgreementCode('Check the checkbox above & click on button to generate code');
    }
  }, [hasUserReadTerms]);

  const handleButtonClick = () => setAgreementCode(getRandomArrayItem(codesList));

  return (
    <>
      {liabilityTermsViewTextContent.length ? (
        <div className="my-8" aria-label="liability terms page">
          <Section>
            <Section.Heading>{liabilityTermsViewTextContent[0].attributes.section_heading}</Section.Heading>
            <div className="p-4 flex flex-col gap-2 overflow-y-auto max-h-96 border rounded bg-gray-100">
              <Section.Text>{liabilityTermsViewTextContent[0].attributes.section_text}</Section.Text>
            </div>
            <form className="py-4 flex flex-col gap-4">
              <div className="box-border flex items-center">
                <input
                  id="agree-to-liability"
                  type="checkbox"
                  value={hasUserReadTerms}
                  onChange={() => setHasUserReadTerms(!hasUserReadTerms)}
                  checked={hasUserReadTerms}
                  className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-orange-200 text-skin-accent hover:cursor-pointer"
                  required
                />
                <label htmlFor="agree-to-liability" className="ml-2">
                  I have read and agree to the all the liability terms of the council.
                </label>
              </div>
              <div className="box-border flex flex-col gap-4">
                <label className="w-full max-w-sm p-8 bg-skin-fill-card-accent text-center text-skin-accent rounded">{agreementCode}</label>
                <button
                  type="button"
                  className={`focus:ring-offset-0.5 inline-block max-w-fit transform rounded-full bg-skin-button-accent px-6 py-2 text-sm uppercase tracking-wide text-skin-muted drop-shadow-md transition hover:-translate-y-0.5 hover:bg-skin-button-accent-hover focus:outline-none focus:ring-1 focus:ring-white lg:text-base ${
                    !hasUserReadTerms && `pointer-events-none bg-gray-300 text-gray-500`
                  }`}
                  disabled={!hasUserReadTerms}
                  onClick={handleButtonClick}
                >
                  Generate Code
                </button>
              </div>
            </form>
          </Section>
        </div>
      ) : null}
    </>
  );
}

LiabilityTerms.displayName = 'LiabilityTerms';

export default LiabilityTerms;
