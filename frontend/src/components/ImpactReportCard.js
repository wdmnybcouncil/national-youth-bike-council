import PropTypes from 'prop-types';
import PageLink from '../components/PageLink';

/**
 * The **ImpactReportCard** component renders a card where Impact Reports of the council are shown.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function ImpactReportCard({ className = '', imageSrc = '', heading, reportName, reportLink }) {
  return (
    <article
      className={`group relative mt-28 flex max-w-sm flex-col items-center gap-1 rounded-2xl border border-transparent bg-skin-fill-card-accent p-6 transition hover:cursor-pointer hover:border-skin-accent lg:p-8 ${className}`}
    >
      <img
        src={imageSrc}
        alt='impact report'
        className={`-mt-28 mb-2 h-40 w-40 max-w-full rounded-full border-4 border-skin-accent transition-all group-hover:scale-105`}
      />
      <h3 className="text-center font-semibold uppercase text-skin-primary">{heading}</h3>
      <PageLink key={reportName} type="external" className="mt-4" linkTo={reportLink}>
        {reportName}
      </PageLink>
    </article>
  );
}

const propTypes = {
  className: PropTypes.string,
  imageSrc: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  reportName: PropTypes.string.isRequired,
  reportLink: PropTypes.string.isRequired,
};

ImpactReportCard.displayName = 'ImpactReportCard';
ImpactReportCard.protoTypes = propTypes;

export default ImpactReportCard;