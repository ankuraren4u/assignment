import React from "react";
import PropTypes from "prop-types";
import { useFela } from "react-fela";
import { inputStyles } from "./styles";

const InputInternal = props => {
  const {
    activeSuggestionIndex,
    inputValue,
    updateInputValue,
    suggestionsCount,
    onQueryChange,
    updateFocus,
    onSelectSuggestion,
    onSuggestionsClear,
    propStyles,
    toggleSuggestion,
    inputRef,
    ...inputRestProps
  } = props;

  const { css } = useFela();

  const ref = inputRef || React.createRef();

  const handleBlur = e => {
    toggleSuggestion(false);
  };

  const handleFocus = e => {
    toggleSuggestion(true);
  };

  const handleKeyDown = event => {
    const { keyCode } = event;
    const lastIndex = suggestionsCount - 1;
    const currentIdx = activeSuggestionIndex;

    inputRestProps && inputRestProps.onKeyUp && inputRestProps.onKeyUp(event);

    switch (keyCode) {
      case 37: // ArrowLeftt
      case 39: // Array Right
        break;

      // ArrowDown
      case 40: 
        event.preventDefault();
        return updateFocus(
          activeSuggestionIndex === lastIndex ? 0 : activeSuggestionIndex + 1
        );

      // ArrowUp
      case 38: 
        event.preventDefault();
        return updateFocus(
          activeSuggestionIndex === 0 ? lastIndex : activeSuggestionIndex - 1
        );

      // Enter
      case 13:
        onSelectSuggestion(currentIdx);
        ref.current.blur();
        break;

      // Escape
      case 27:
        onSuggestionsClear && onSuggestionsClear();
        ref.current.blur();
        break;

      default:
        break;
    }
  };

  const onChange = event => {
    const query = event.target.value;
    if (query && query.length) {
      onQueryChange(query);
    } else {
      onSuggestionsClear && onSuggestionsClear();
    }

    updateInputValue(query);
  };

  return (
    <input
      type="text"
      ref={ref}
      value={inputValue}
      onBlur={handleBlur}
      onFocus={handleFocus}
      className={css([inputStyles, propStyles])}
      onKeyDown={handleKeyDown}
      onChange={onChange}
      {...inputRestProps}
    />
  );
};

InputInternal.propTypes = {
  propStyles: PropTypes.object,
  /* TODO : Add proptype */
  inputRef: PropTypes.object, //PropTypes.element),
  inputValue: PropTypes.string.isRequired,
  updateInputValue: PropTypes.func.isRequired,
  activeSuggestionIndex: PropTypes.number.isRequired,
  suggestionsCount: PropTypes.number.isRequired,
  updateFocus: PropTypes.func.isRequired,
  onQueryChange: PropTypes.func.isRequired,
  onSelectSuggestion: PropTypes.func.isRequired,
  onSuggestionsClear: PropTypes.func,
  inputRestProps: PropTypes.object
};

export const Input = React.memo(InputInternal);
