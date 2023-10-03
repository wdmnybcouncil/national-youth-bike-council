import { useState, useEffect, useRef, useCallback } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import Logo from './Logo';
import CTALink from './CTALink';
import Nav from './Nav';
import Dropdown from './DropDown';

import { useOnClickOutside } from '../hooks/useOnClickOutside';
import CurrentMenuStateContext from '../contexts/CurrentMenuStateContext';
import btnArrow from '../assets/images/btn-arrow.svg';
import logoIcon from '../assets/images/icon-logo.png';

/**
 * WebsiteLink describes data for a link in the website
 * @typedef WebsiteLink
 * @property {string} title title of the link
 * @property {'internal' | 'external'} type type of the link - internal or external
 * @property {string} url the actual url of the link
 */

/**
 * WebsiteHeaderData describes data for different sections of the website's header
 * @typedef WebsiteHeaderData
 * @property {WebsiteLink[]} aboutUsMenu menu data for the About Us section
 * @property {WebsiteLink[]} councilPressMenu menu data for the Council Press section
 * @property {WebsiteLink[]} resourcesMenu menu data for the Resources section
 */

/**
 * @typedef Props
 * @prop {WebsiteHeaderData} data
 */

/**
 * A header component optimized for mobile devices, providing a seamless user experience, with options for branding, logos, and menu items.
 * @component
 * @param {Props} props
 * @returns {React.ReactElement} The Header.
 *
 * @version 2.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 *
 * @example
 * <Header />
 */
function Header({ data }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Close the menu on window resize
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  useEffect(() => {
    setIsMenuOpen(false);
  }, [windowWidth]);

  // Close the menu when user clicks outside the menu
  const ref = useRef();
  useOnClickOutside(
    ref,
    useCallback(() => setIsMenuOpen(false), []),
  );

  /**
   * Toggles the menu open state.
   */
  const handleMenuClick = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header ref={ref} className="w-full bg-skin-fill-primary text-skin-muted">
      <div className={clsx('mx-auto flex max-w-screen-xl flex-col px-8 py-6', 'md:px-10', 'lg:flex-row lg:items-center lg:justify-between')}>
        <div className="flex flex-row items-center justify-between">
          <Logo linkTo="/" logoSrc={logoIcon} logoAlt="logo for National Youth Bike Council with a big N with wheels" />
          <button className={clsx('focus:shadow-outline rounded-lg focus:outline-none', 'lg:hidden')} onClick={handleMenuClick} aria-label="hamburger">
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
              {data.aboutUsMenu.map(({ title, type, url }) => (
                <Dropdown.Item key={title} type={type} linkTo={url}>
                  {title}
                </Dropdown.Item>
              ))}
            </Dropdown>
            <Nav.Item linkTo="/projects">Projects</Nav.Item>
            <Dropdown label="Council Press">
              {data.councilPressMenu.map(({ title, type, url }) => (
                <Dropdown.Item key={title} type={type} linkTo={url}>
                  {title}
                </Dropdown.Item>
              ))}
            </Dropdown>
            <Dropdown label="Resources">
              {data.resourcesMenu.map(({ title, type, url }) => (
                <Dropdown.Item key={title} type={type} linkTo={url}>
                  {title}
                </Dropdown.Item>
              ))}
            </Dropdown>
            <CTALink type="internal" linkTo="/join-us" className={clsx("ml-2 mt-2", 'lg:mt-0 lg:ml-4')}>
              Join us
              <img src={btnArrow} alt="arrow on button" className="ml-2 inline h-5" />
            </CTALink>
          </Nav>
        </CurrentMenuStateContext.Provider>
      </div>
    </header>
  );
}

const propTypes = {
  /**
   * @type {WebsiteHeaderData} The header menu names and links to navigate to.
   */
  data: PropTypes.object.isRequired,
};

Header.displayName = 'Header';
Header.protoTypes = propTypes;

export default Header;
