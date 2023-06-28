import { useState, useEffect } from 'react';
import Section from '../components/Section';
import ImpactReportCard from '../components/ImpactReportCard';
import api from '../utils/api';
import { getYearFromDateString, getMonthFromDateString } from '../utils/commonUtils';

/**
 * The **ImpactReports** component renders the annual impact reports of the council.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function ImpactReports() {
  const [impactReportsViewTextContent, setImpactReportsViewTextContent] = useState([]);
  const [impactReports, setImpactReports] = useState([]);

  useEffect(() => {
    // Get the text contents of the page
    api
      .getImpactReportsViewTextContents()
      .then(({ data }) => setImpactReportsViewTextContent(data))
      .catch((err) => {
        console.log('Uh-oh! Error occurred while fetching the reports data from the server.');
        console.log(err);
      });

    // Get all the impact reports
    api
      .getImpactReports()
      .then(({ data }) => setImpactReports(data))
      .catch((err) => {
        console.log('Uh-oh! Error occurred while fetching the reports data from the server.');
        console.log(err);
      });
  }, []);

  const renderImpactReportCards = (reports) =>
    reports.map((report) => {
      const { pdf, report_name, report_date, report_image } = report.attributes;
      const reportLink = pdf.data[0].attributes.url;
      const cardHeading = `${getYearFromDateString(report_date)} ${getMonthFromDateString(report_date)}`;

      return (
        <ImpactReportCard
          key={report_name}
          imageSrc={report_image.data.attributes.url}
          heading={cardHeading}
          reportName={report_name}
          reportLink={reportLink}
        />
      );
    });

  return (
    <>
      {impactReportsViewTextContent.length ? (
        <div className="my-8" aria-label="resources page">
          <Section>
            <Section.Heading>{impactReportsViewTextContent[0].attributes.section_heading}</Section.Heading>
            {impactReportsViewTextContent[0].attributes.section_text.length > 0 ? (
              <Section.Text>{impactReportsViewTextContent[0].attributes.section_text}</Section.Text>
            ) : null}
            {impactReports.length > 0 ? renderImpactReportCards(impactReports) : <Section.Text>No reports to show yet!</Section.Text>}
          </Section>
        </div>
      ) : null}
    </>
  );
}

ImpactReports.displayName = 'ImpactReports';

export default ImpactReports;
