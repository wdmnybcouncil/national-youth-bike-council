import React from "react";
import Section from "../components/Section";
import PageLink from "../components/PageLink";
import api from "../utils/api";

/**
 * The **ImpactReports** component renders the annual impact reports of the council.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function ImpactReports() {
  const [impactReports, setImpactReports] = React.useState([]);

  // Get all the impact reports
  React.useEffect(() => {
    api.getImpactReports()
      .then(({ data }) => {
        console.log(data);
        setImpactReports(data);
      })
      .catch(err => {
        console.log('Uh-oh! Error occurred while fetching the reports data from the server.');
        console.log(err);
      });
  }, []);

  const renderImpactReportLinks = (reports) =>
    reports.map(report => {
      const { pdf, report_name } = report.attributes;
      const reportLink = pdf.data[0].attributes.url;

      return (
        <PageLink key={report_name} type="external" className="mt-4" linkTo={reportLink}>
          {report_name}
        </PageLink>
      )
    });

  return (
    <div className="my-8" aria-label="resources page">
      <Section>
        <Section.Heading>Impact Reports</Section.Heading>
        {impactReports.length > 0
          ? renderImpactReportLinks(impactReports)
          : (
            <Section.Text>No reports to show yet!</Section.Text>
          )}
      </Section>
    </div>
  );
}

ImpactReports.displayName = "ImpactReports";

export default ImpactReports;
