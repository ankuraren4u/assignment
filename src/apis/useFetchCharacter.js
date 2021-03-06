import { useState, useCallback } from "react";
import { memoize } from "lodash";
import { API_BASE_URL } from "./const";

const API_URl = `${API_BASE_URL}/characters/{id}`;
const getCharacter = memoize(async id => {
  let url = API_URl.replace("{id}", id);
  return (await (await fetch(url)).json()).character || {};
});

export const useFetchCharacter = () => {
  const [character, updateCharacter] = useState();

  const fetchCharacter = useCallback(async id => {
    const character = await getCharacter(id);
    updateCharacter(character);
  }, []);

  return [character, fetchCharacter];
};
