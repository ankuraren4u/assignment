import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useFela } from "react-fela";
import classnames from "classnames";
import { suggestionStyle } from "./styles";
export const SuggestionInternal = ({
  suggestion,
  isActive,
  itemIndex,
  suggestionRenderer,
  onMouseOver,
  onSelectSuggestion
}) => {
  const { css } = useFela({ isActive });
  const ref = React.createRef();
  useEffect(() => {
    if (!isActive) {
      return 
    }

    const parentEleent = ref.current.parentElement;
    if(parentEleent.scrollTop > (ref.current.offsetTop)) {
      ref.current.scrollIntoView(true);
    }
    if((parentEleent.scrollTop  + parentEleent.clientHeight)  < ref.current.offsetTop + ref.current.offsetHeight) {
      ref.current.scrollIntoView(false);
    }
  }, [isActive, ref]);

  const handleMouseOver = () => {
    onMouseOver(itemIndex);
  };

  const handleOnMouseDown = () => {
    onSelectSuggestion(itemIndex);
  };

  let element;
  if (suggestionRenderer) {
    element = suggestionRenderer(suggestion, isActive);
  } else {
    element = (
      <div
        className={classnames(css(suggestionStyle), {
          active: isActive
        })}
      >
        {suggestion.name}
      </div>
    );
  }
  return (
    <li
      onMouseOver={handleMouseOver}
      onMouseDown={handleOnMouseDown}
      ref={ref}
    >
      {element}
    </li>
  );
};

SuggestionInternal.propTypes = {
  suggestion: PropTypes.object,
  isActive: PropTypes.bool,
  itemIndex: PropTypes.number,
  onMouseOver: PropTypes.func,
  onSelectSuggestion: PropTypes.func,
  suggestionRenderer: PropTypes.func
};

export const Suggestion = React.memo(SuggestionInternal);
