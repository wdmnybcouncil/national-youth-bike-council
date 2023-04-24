import Logo from './Logo';
import MailTo from './MailTo';
import FooterSection from './FooterSection';
import PageLink from './PageLink';
import CTALink from '../components/CTALink';
import logoIcon from '../assets/images/icon-logo.png';

function Footer({ footer }) {
  const renderFooterLinks = (links) => {
    return links.map((link) => {
      if (link.title === 'Donate') {
        return (
          <CTALink key={link.title} type={link.type} linkTo={link.url}>
            {link.title}
          </CTALink>
        );
      } else {
        return (
          <PageLink key={link.title} type={link.type} linkTo={link.url} className="mt-0 bg-skin-fill-primary text-sm text-skin-muted lg:text-base no-underline hover:underline">
            {link.icon ? <img src={link.icon.src} alt={link.icon.alt} className="h-6 w-6" /> : null}
            {link.title}
          </PageLink>
        );
      }
    });
  }

  const renderFooterSection = ({ heading, links }) => {
    return (
      <>
        <FooterSection.Header>{heading}</FooterSection.Header>
        {renderFooterLinks(links)}
      </>
    );
  }

  return (
    <footer className="w-full pt-4 bg-skin-fill-primary text-sm text-skin-muted lg:text-base">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-y-10 px-8 py-6 md:flex-row md:items-start md:justify-between md:gap-y-0 md:px-10">
        <div className="flex flex-col gap-2 xs:gap-0">
          <div className="flex flex-col gap-4 xs:flex-row xs:items-center md:items-start">
            <Logo linkTo="/" logoSrc={logoIcon} logoAlt="logo for National Youth Bike Council with a big N with wheels" />
            <h2 className="font-semibold uppercase">{footer[0].heading}</h2>
          </div>
          <div className="flex flex-col gap-1 xs:pl-16 lg:pl-20">
            <p>Email us at -</p>
            <div className="flex flex-row items-center gap-2">
              <img src={footer[0].email.icon.src} className="h-6 w-6" alt={footer[0].email.icon.alt} />
              <MailTo email={footer[0].email.address} subject={footer[0].email.subject} body={footer[0].email.body}>
                {footer[0].email.address}
              </MailTo>
            </div>
            <p>reach out for inquires!</p>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-y-10 xs:flex-row xs:gap-y-0 md:gap-x-16 lg:gap-x-24">
          <FooterSection>
            {/* Section # 1 - About Us */}
            {renderFooterSection(footer[1])}
          </FooterSection>

          {/* Section # 2 - Support Us */}
          <FooterSection>
            {renderFooterSection(footer[2])}
          </FooterSection>

          {/* Section # 3 - Social */}
          <FooterSection>
            {renderFooterSection(footer[3])}
          </FooterSection>
        </div>
      </div>
      <p className="px-8 pb-6 text-center text-xs md:px-10">©{new Date().getFullYear()} by National Youth Bike Council | A 501(c)(3) Organization</p>
    </footer>
  );
}

export default Footer;
