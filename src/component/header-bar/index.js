import React from "react";
import PropTypes from "prop-types";
import { useFela } from "react-fela";
import classnames from "classnames";
import { headerStyle } from "./style";
export const HeaderBar = ({ children }) => {
  const { css } = useFela();
  const headerClass = classnames("ui-header", css(headerStyle));
  return <div className={headerClass}>{children}</div>;
};

HeaderBar.propTypes = {
  children: PropTypes.node.isRequired
};
