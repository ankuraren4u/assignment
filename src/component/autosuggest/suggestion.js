import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useFela } from "react-fela";
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
    isActive && ref.current.scrollIntoView(false);
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
    element = <div className={css(suggestionStyle)}>{suggestion.name}</div>;
  }
  return (
    <li
      key={suggestion.id}
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

// export const Suggestion = SuggestionInternal;
