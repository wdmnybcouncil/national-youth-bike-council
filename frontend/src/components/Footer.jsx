import { useState, useEffect } from 'react';

import Logo from './Logo';
import MailTo from './MailTo';
import FooterSection from './FooterSection';
import PageLink from './PageLink';
import CTALink from './CTALink';

import logoIcon from '../assets/images/icon-logo.png';
import api from '../utils/api';

/**
 * A footer component optimized for mobile devices, providing a seamless user experience, with options for branding, logos, menu items and social links.
 * @component
 * @returns {React.ReactElement} The Footer.
 *
 * @version 2.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 *
 * @example
 * <Footer />
 */
function Footer() {
  const [menus, setMenus] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);

  // Get the menu links for the Footer
  useEffect(() => {
    api
      .getFooterMenus()
      .then(({ data }) => setMenus(data))
      .catch((err) => {
        console.log('Uh-oh! Error occurred while fetching the data from the server.');
        console.log(err);
      });
  }, []);

  // Get the menu links for the Footer
  useEffect(() => {
    api
      .getSocialMediaLinks()
      .then(({ data }) => setSocialLinks(data))
      .catch((err) => {
        console.log('Uh-oh! Error occurred while fetching the data from the server.');
        console.log(err);
      });
  }, []);

  const renderFooterLinks = (links) => {
    return links.map((link) => {
      const { link_title, type_of_link = 'external', link_url, link_icon = {} } = link.attributes;
      const { image_file = {}, alternate_text = '' } = link_icon;
      if (link_title === 'Donate') {
        return (
          <CTALink key={link_title} type={type_of_link} linkTo={link_url}>
            {link_title}
          </CTALink>
        );
      } else {
        return (
          <PageLink
            key={link_title}
            type={type_of_link}
            linkTo={link_url}
            className="mt-0 bg-skin-fill-primary text-sm text-skin-muted lg:text-base no-underline hover:underline"
          >
            {Object.keys(link_icon).length ? <img src={image_file.data.attributes.url} alt={alternate_text} className="h-6 w-6" /> : null}
            {link_title}
          </PageLink>
        );
      }
    });
  };

  const renderFooterSection = (menu) => {
    const {
      title,
      website_page_links: { data: website_page_links },
    } = menu.attributes;
    return (
      <>
        <FooterSection.Header>{title}</FooterSection.Header>
        {renderFooterLinks(website_page_links)}
      </>
    );
  };

  return (
    <footer className="w-full pt-4 bg-skin-fill-primary text-sm text-skin-muted lg:text-base">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-y-10 px-8 py-6 md:flex-row md:items-start md:justify-between md:gap-y-0 md:px-10">
        <div className="flex flex-col gap-2 xs:gap-0">
          <div className="flex flex-col gap-4 xs:flex-row xs:items-center md:items-start">
            <Logo linkTo="/" logoSrc={logoIcon} logoAlt="logo for National Youth Bike Council with a big N with wheels" />
            <h2 className="font-kaleko font-bold tracking-wide uppercase">National Youth Bike Council</h2>
          </div>
          {socialLinks.length ? (
            <div className="flex flex-col gap-1 xs:pl-16 lg:pl-20">
              <p>Email us at -</p>
              <div className="flex flex-row items-center gap-2">
                <img
                  src={socialLinks[0].attributes.link_icon.image_file.data.attributes.url}
                  className="h-6 w-6"
                  alt={socialLinks[0].attributes.link_icon.alternate_text}
                />
                <MailTo email={socialLinks[0].attributes.link_url} subject="Enquiry about the council membership" body="Hi Team!">
                  {socialLinks[0].attributes.link_url}
                </MailTo>
              </div>
              <p>reach out for inquires!</p>
            </div>
          ) : null}
        </div>
        <div className="flex flex-col justify-between gap-y-10 xs:flex-row xs:gap-y-0 md:gap-x-16 lg:gap-x-24">
          <FooterSection>
            {/* Section # 1 - About Us */}
            {menus.length > 0 ? renderFooterSection(menus[0]) : null}
          </FooterSection>

          {/* Section # 2 - Support Us */}
          <FooterSection>{menus.length > 0 ? renderFooterSection(menus[1]) : null}</FooterSection>

          {/* Section # 3 - Social */}
          <FooterSection>
            <FooterSection.Header>Social</FooterSection.Header>
            {socialLinks.length > 0 ? renderFooterLinks(socialLinks.slice(1)) : null}
          </FooterSection>
        </div>
      </div>
      <p className="px-8 pb-6 text-center text-xs md:px-10">©{new Date().getFullYear()} by National Youth Bike Council | A 501(c)(3) Organization</p>
    </footer>
  );
}

export default Footer;
