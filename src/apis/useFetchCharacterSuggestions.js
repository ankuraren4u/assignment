import { useState, useCallback, useMemo } from "react";
import { debounce, memoize } from "lodash";
import { useHistory } from "react-router-dom";
import { API_BASE_URL } from "./const";

const API_URl = `${API_BASE_URL}/search/{query}`;
const getCharacters = memoize(async query => {
  let url = API_URl.replace("{query}", query.toLowerCase());
  return (await (await fetch(url)).json()).characters || [];
});

export const useFetchCharacterSuggestions = (initialState) => {
  const [characters, updateCharacters] = useState(initialState);
  const history = useHistory();

  const fetchCharacters = useMemo(
    () =>
      debounce(async query => {
        const characters = await getCharacters(query);
        updateCharacters(characters);
      }, 200),
    []
  );

  const clearCharacters = useCallback(() => {
    updateCharacters([]);
  }, []);

  const navigateToCharacter = useCallback(
    suggestion => {
      history.push(`/character/${suggestion.id}`);
    },
    [history]
  );

  return [characters, fetchCharacters, navigateToCharacter, clearCharacters];
};
