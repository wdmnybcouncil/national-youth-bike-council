import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import MailTo from "./MailTo";
import logoIcon from "../images/icon-logo.png";
import mailIcon from "../images/icon-mail.svg";
import discordIcon from "../images/icon-discord.svg";
import instagramIcon from "../images/icon-instagram.svg";
import twitterIcon from "../images/icon-twitter.svg";
import facebookIcon from "../images/icon-facebook.svg";
import youtubeIcon from "../images/icon-youtube.svg";

function Footer() {
  return (
    <footer className="w-full bg-skin-fill-primary text-sm text-skin-muted lg:text-base">
      <div className="mx-auto flex max-w-screen-xl flex-col px-4 md:flex-row md:items-start md:justify-between md:px-6">
        <div className="flex flex-col gap-2 xs:gap-0 p-4 lg:px-0">
          <div className="flex flex-col xs:flex-row xs:items-center md:items-start gap-4">
            <Logo linkTo="" logoSrc={logoIcon} logoAlt="logo for National Youth Bike Council with a big N with wheels" />
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
        <div className="flex flex-col justify-between p-4 gap-y-10 xs:flex-row xs:gap-y-0 md:gap-x-16 lg:gap-x-24 lg:px-0">
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold uppercase">Support # 1</h2>
            <Link to="">Newsletter</Link>
            <Link to="">Donate</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold uppercase">Support</h2>
            <Link to="">Newsletter</Link>
            <Link to="">Donate</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold uppercase">Social</h2>
            <Link to="" className="flex gap-2">
              <img src={discordIcon} alt="discord icon" className="h-6 w-6" />
              Discord
            </Link>
            <Link to="" className="flex gap-2">
              <img src={instagramIcon} alt="instagram icon" className="h-6 w-6" />
              Instagram
            </Link>
            <Link to="" className="flex gap-2">
              <img src={twitterIcon} alt="twitter icon" className="h-6 w-6" />
              Twitter
            </Link>
            <Link to="" className="flex gap-2">
              <img src={facebookIcon} alt="facebook icon" className="h-6 w-6" />
              Facebook
            </Link>
            <Link to="" className="flex gap-2">
              <img src={youtubeIcon} alt="facebook icon" className="h-6 w-6" />
              Youtube
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
