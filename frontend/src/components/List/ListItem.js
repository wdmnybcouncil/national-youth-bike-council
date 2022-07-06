import React from "react";
import PropTypes from "prop-types";

/**
 * The **ListItemItem** component renders each item in the unordered ListItem on the page.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function ListItem({ children }) {
  return <li>{children}</li>;
}

const propTypes = {
  children: PropTypes.any.isRequired,
};

ListItem.displayName = "ListItem";
ListItem.propTypes = propTypes;

export default ListItem;
