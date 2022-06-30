import React from "react";
import Logo from "./Logo";
import MailTo from "./MailTo";
import FooterSection from "./FooterSection";
import PageLink from "./PageLink";
import CTALink from "../components/CTALink";
import logoIcon from "../assets/images/icon-logo.png";
import mailIcon from "../assets/images/icon-mail.svg";
import discordIcon from "../assets/images/social/icon-discord.svg";
import instagramIcon from "../assets/images/social/icon-instagram.svg";
import twitterIcon from "../assets/images/social/icon-twitter.svg";
import facebookIcon from "../assets/images/social/icon-facebook.svg";
import youtubeIcon from "../assets/images/social/icon-youtube.svg";

function Footer() {
  return (
    <footer className="w-full pt-4 bg-skin-fill-primary text-sm text-skin-muted lg:text-base">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-y-10 px-8 py-6 md:flex-row md:items-start md:justify-between md:gap-y-0 md:px-10">
        <div className="flex flex-col gap-2 xs:gap-0">
          <div className="flex flex-col gap-4 xs:flex-row xs:items-center md:items-start">
            <Logo linkTo="/" logoSrc={logoIcon} logoAlt="logo for National Youth Bike Council with a big N with wheels" />
            <h2 className="font-semibold uppercase">National Youth Bike Council</h2>
          </div>
          <div className="flex flex-col gap-1 xs:pl-16 lg:pl-20">
            <p>Email us at -</p>
            <div className="flex flex-row items-center gap-2">
              <img src={mailIcon} className="h-6 w-6" alt="mail icon for email address" />
              <MailTo email="info@nybcouncil.com" subject="Enquiry about the council membership" body="Hi Team!">
                info@nybcouncil.com
              </MailTo>
            </div>
            <p>reach out for inquires!</p>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-y-10 xs:flex-row xs:gap-y-0 md:gap-x-16 lg:gap-x-24">
          <FooterSection>
            {/* Section # 1 - About Us */}
            <FooterSection.Header>About Us</FooterSection.Header>
            <PageLink type="internal" linkTo="/how-it-started" className="mt-0 bg-skin-fill-primary text-sm text-skin-muted lg:text-base no-underline hover:underline">How It Started</PageLink>
            <PageLink type="internal" linkTo="/where-are-we" className="mt-0 bg-skin-fill-primary text-sm text-skin-muted lg:text-base no-underline hover:underline">Where are we?</PageLink>
            <PageLink type="internal" linkTo="/why-the-council" className="mt-0 bg-skin-fill-primary text-sm text-skin-muted lg:text-base no-underline hover:underline">Why the Council?</PageLink>
          </FooterSection>

          {/* Section # 2 - Support Us */}
          <FooterSection>
            <FooterSection.Header>Support</FooterSection.Header>
            <PageLink type="external" linkTo="https://docs.google.com/forms/d/e/1FAIpQLSfCLjXlghaJvNn8ijeqImKdB6KO1Mtx4bcfxqJRhns3xpxw6w/viewform?usp=sf_link" className="mt-0 bg-skin-fill-primary text-sm text-skin-muted lg:text-base no-underline hover:underline">Newsletter</PageLink>
            <CTALink type="external" linkTo="https://www.paypal.com/donate/?hosted_button_id=NMZD8JZX7UZ28">
              Donate
            </CTALink>
          </FooterSection>

          {/* Section # 3 - Social */}
          <FooterSection>
            <FooterSection.Header>Social</FooterSection.Header>
            <PageLink type="external" linkTo="https://discord.gg/2jnVUXUkHk" className="mt-0 bg-skin-fill-primary text-sm text-skin-muted lg:text-base no-underline hover:underline">
              <img src={discordIcon} alt="discord icon" className="h-6 w-6" />
              Discord
            </PageLink>
            <PageLink type="external" linkTo="https://www.instagram.com/nationalyouthbike/?hl=en" className="mt-0 bg-skin-fill-primary text-sm text-skin-muted lg:text-base no-underline hover:underline">
              <img src={instagramIcon} alt="instagram icon" className="h-6 w-6" />
              Instagram
            </PageLink>
            <PageLink type="external" linkTo="https://twitter.com/National_ybc" className="mt-0 bg-skin-fill-primary text-sm text-skin-muted lg:text-base no-underline hover:underline">
              <img src={twitterIcon} alt="twitter icon" className="h-6 w-6" />
              Twitter
            </PageLink>
            <PageLink type="external" linkTo="https://www.facebook.com/Nybcouncil/" className="mt-0 bg-skin-fill-primary text-sm text-skin-muted lg:text-base no-underline hover:underline">
              <img src={facebookIcon} alt="facebook icon" className="h-6 w-6" />
              Facebook
            </PageLink>
            <PageLink type="external" linkTo="https://www.youtube.com/channel/UC6J-nXvkVU4LyEFf73_mR2Q" className="mt-0 bg-skin-fill-primary text-sm text-skin-muted lg:text-base no-underline hover:underline">
              <img src={youtubeIcon} alt="facebook icon" className="h-6 w-6" />
              Youtube
            </PageLink>
          </FooterSection>
        </div>
      </div>
      <p className="px-8 pb-6 text-center text-xs md:px-10">©{new Date().getFullYear()} by National Youth Bike Council | A 501(c)(3) Organization</p>
    </footer>
  );
}

export default Footer;
