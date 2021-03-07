import React from "react";
import PropTypes from "prop-types";
import { useFela } from "react-fela";
import classnames from "classnames";
import { containerStyle, rowStyle, keyStyle, valueStyle } from "./style";

export const TableView = ({ obj }) => {
  const { css } = useFela();
  const headerClass = classnames("table-view", css(containerStyle));

  return (
    <div className={headerClass}>
      {obj &&
        Object.keys(obj).map(key => (
          <div key={key} className={css(rowStyle)}>
            <div className={css(keyStyle)}>{key}</div>
            <div className={css(valueStyle)}>{obj[key]}</div>
          </div>
        ))}
    </div>
  );
};

TableView.propTypes = {
  obj: PropTypes.object
};
