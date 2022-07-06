import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import NavItem from "./NavItem";
import { navBarAnimationVariants } from "../../utils/animationVariants";

function Nav({ isMenuOpen, children }) {
  return <motion.nav
    className={`${isMenuOpen ? `flex` : `hidden`} flex-grow flex-col pb-6 lg:flex lg:flex-row lg:justify-end lg:pb-0`}
    variants={navBarAnimationVariants}
    initial="hidden"
    whileInView="visible">
    {children}
  </motion.nav >;
}

const propTypes = {
  /**
   * Tells if the Nav menu is open or closed
   */
  isMenuOpen: PropTypes.bool.isRequired,
  /**
   * Sets the content of the Nav
   */
  children: PropTypes.any.isRequired,
};

Nav.displayName = "Nav";
Nav.propTypes = propTypes;

export default Object.assign(Nav, {
  Item: NavItem,
});
