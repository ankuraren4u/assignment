import React, { useEffect } from "react";
import { HeaderBar, Autosuggest } from "./../../component";
import { useFetchCharacterSuggestions } from "./../../apis/useFetchCharacterSuggestions";

import {inputStyles} from "./style";

export const Header = () => {
  const inputRef = React.createRef();
  const [
    characters,
    fetchCharacters,
    navigateToCharacter,
    clearCharacters
  ] = useFetchCharacterSuggestions([]);

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <HeaderBar>
      <Autosuggest
        suggestions={characters}
        onQueryChange={fetchCharacters}
        onSelectionChange={navigateToCharacter}
        onSuggestionsClear={clearCharacters}
        inputProps={{
          inputRef: inputRef,
          placeholder: "Search for Starwars Character"
        }}
        propStyles={inputStyles}
      />
    </HeaderBar>
  );
};
