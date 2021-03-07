import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { useFela } from "react-fela";
import classnames from "classnames";
import { wrapperStyles } from "./styles";
import { Input } from "./input";
import { SuggestionsList } from "./suggestions-list";
export const Autosuggest = props => {
  const [activeSuggestionIndex, updateActiveSuggestionIndex] = useState(0);
  const [isSuggestionsOpen, updateIsSuggestionsOpen] = useState(false);
  const [inputValue, updateInputValue] = useState("");
  const { css } = useFela();

  const {
    suggestions,
    onQueryChange,
    onSuggestionsClear,
    onSelectionChange,
    inputProps,
    suggestionRenderer,
    propStyles
  } = props;

  const updateFocus = useCallback((idx = 0) => {
    updateActiveSuggestionIndex(idx);
  }, []);

  const onSelectSuggestion = useCallback(
    suggestionIdx => {
      let suggestion = suggestions[suggestionIdx];
      updateInputValue(suggestion.name);
      onSelectionChange(suggestion);
    },
    [onSelectionChange, suggestions]
  );

  const handleSuggestionsClear = useCallback(() => {
    updateActiveSuggestionIndex(0);
    updateInputValue("");
    onSuggestionsClear();
  }, [onSuggestionsClear]);

  const handleQueryChange = useCallback(
    query => {
      updateActiveSuggestionIndex(0);
      updateInputValue(query);
      onQueryChange(query);
    },
    [onQueryChange]
  );

  return (
    <div
      className={classnames("ui-autosuggest", css(wrapperStyles, propStyles))}
    >
      <Input
        inputValue={inputValue}
        updateInputValue={updateInputValue}
        activeSuggestionIndex={activeSuggestionIndex}
        suggestionsCount={(suggestions && suggestions.length) || 0}
        updateFocus={updateFocus}
        onQueryChange={handleQueryChange}
        onSelectSuggestion={onSelectSuggestion}
        onSuggestionsClear={handleSuggestionsClear}
        toggleSuggestion={updateIsSuggestionsOpen}
        {...inputProps}
      />
      {isSuggestionsOpen && suggestions && suggestions.length && (
        <SuggestionsList
          activeSuggestionIndex={activeSuggestionIndex}
          suggestions={suggestions}
          onSuggestionMouseOver={updateFocus}
          onSelectSuggestion={onSelectSuggestion}
          suggestionRenderer={suggestionRenderer}
        />
      )}
    </div>
  );
};

Autosuggest.propTypes = {
  suggestions: PropTypes.array.isRequired,
  onQueryChange: PropTypes.func.isRequired,
  onSelectionChange: PropTypes.func.isRequired,
  onSuggestionsClear: PropTypes.func,
  inputProps: PropTypes.object,
  suggestionRenderer: PropTypes.func,
  propStyles: PropTypes.object
};
