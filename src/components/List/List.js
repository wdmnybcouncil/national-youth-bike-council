import React from "react";
import PropTypes from "prop-types";
import ListItem from "./ListItem";

/**
 * The **List** component renders unordered list on the page.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function List({ children }) {
  return (
    <ul className="list-inside list-disc marker:text-skin-accent marker:text-xl">{children}</ul>
  );
}

const propTypes = {
  children: PropTypes.any.isRequired,
};

List.displayName = "List";
List.propTypes = propTypes;

export default Object.assign(List, {
  Item: ListItem,
});
