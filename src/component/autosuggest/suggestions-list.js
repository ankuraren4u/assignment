import React from "react";
import PropTypes from "prop-types";
import { useFela } from "react-fela";
import { suggestionWrapperStyles } from "./styles";
import { Suggestion } from "./suggestion";
export const SuggestionsList = ({
  suggestions,
  activeSuggestionIndex,
  onSuggestionMouseOver,
  onSelectSuggestion,
  suggestionRenderer
}) => {
  const { css } = useFela();

  return (
    <ul className={css(suggestionWrapperStyles)}>
      {suggestions &&
        suggestions.map((suggestion, idx) => (
          <Suggestion
            suggestion={suggestion}
            key={suggestion.id}
            isActive={idx === activeSuggestionIndex}
            itemIndex={idx}
            onMouseOver={onSuggestionMouseOver}
            onSelectSuggestion={onSelectSuggestion}
            suggestionRenderer={suggestionRenderer}
          />
        ))}
    </ul>
  );
};

SuggestionsList.propTypes = {
  suggestions: PropTypes.array,
  activeSuggestionIndex: PropTypes.number,
  onSuggestionMouseOver: PropTypes.func,
  onSelectSuggestion: PropTypes.func,
  suggestionRenderer: PropTypes.func
};
