import React from "react";
import Logo from "./Logo";
import CTALink from "./CTALink";
import Nav from "./Nav";
import Dropdown from "./DropDown";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import CurrentMenuStateContext from "../contexts/CurrentMenuStateContext";
import btnArrow from "../assets/images/btn-arrow.svg";
import logoIcon from "../assets/images/icon-logo.png";

/**
 * The **Header** component renders the header of the website.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const handleMenuClick = () => setIsMenuOpen(!isMenuOpen);

  // Close the menu when user cliocks outside the menu
  const ref = React.useRef();
  useOnClickOutside(
    ref,
    React.useCallback(() => setIsMenuOpen(false), [])
  );

  // Close the menu on window resize
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    }
  });

  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [windowWidth]);


  return (
    <header ref={ref} className="w-full bg-skin-fill-primary text-skin-muted">
      <div className="mx-auto flex max-w-screen-xl flex-col px-8 py-6 md:px-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-row items-center justify-between">
          <Logo linkTo="/" logoSrc={logoIcon} logoAlt="logo for National Youth Bike Council with a big N with wheels" />
          <button className="focus:shadow-outline rounded-lg focus:outline-none lg:hidden" onClick={handleMenuClick}>
            <svg fill="currentColor" viewBox="0 0 20 20" className="h-8 w-8">
              {!isMenuOpen && (
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              )}
              {isMenuOpen && (
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              )}
            </svg>
          </button>
        </div>
        <CurrentMenuStateContext.Provider value={setIsMenuOpen}>
          <Nav isMenuOpen={isMenuOpen}>
            <Dropdown label="About Us">
              <Dropdown.Item type="internal" linkTo="/how-it-started">How It Started</Dropdown.Item>
              <Dropdown.Item type="internal" linkTo="/where-are-we">Where Are We</Dropdown.Item>
              <Dropdown.Item type="internal" linkTo="/why-the-council">Why The Council</Dropdown.Item>
              <Dropdown.Item type="internal" linkTo="/council-members">Council Members</Dropdown.Item>
              <Dropdown.Item type="internal" linkTo="/advisors">Advisors</Dropdown.Item>
              <Dropdown.Item type="internal" linkTo="/board-members">Board Members</Dropdown.Item>
              <Dropdown.Item type="internal" linkTo="/sponsorships">Partners & Sponsorships</Dropdown.Item>
            </Dropdown>
            <Nav.Item linkTo="/projects">Projects</Nav.Item>
            <Dropdown label="Council Press">
              <Dropdown.Item type="internal" linkTo="/media-coverage">Media Coverage</Dropdown.Item>
              <Dropdown.Item type="internal" linkTo="/council-blogs">Council Blogs</Dropdown.Item>
              <Dropdown.Item type="external" linkTo="https://docs.google.com/forms/d/e/1FAIpQLSfCLjXlghaJvNn8ijeqImKdB6KO1Mtx4bcfxqJRhns3xpxw6w/viewform?usp=sf_link">Newsletter</Dropdown.Item>
            </Dropdown>
            <Dropdown label="Resources">
              <Dropdown.Item type="internal" linkTo="/resources-safety">Resources & Safety</Dropdown.Item>
            </Dropdown>
            <CTALink type="internal" linkTo="/join-us" className="ml-2 mt-2 lg:mt-0 lg:ml-4">
              Join us
              <img src={btnArrow} alt="arrow on button" className="ml-2 inline h-5" />
            </CTALink>
          </Nav>
        </CurrentMenuStateContext.Provider>
      </div>
    </header>
  );
}

Header.displayName = "Header";

export default Header;
