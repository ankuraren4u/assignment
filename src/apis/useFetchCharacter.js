import { useState, useCallback } from "react";
import { memoize } from "lodash";

import { GET_CHARACTER_API_URl } from "./const";

const getCharacter = memoize(async id => {
  try {
    let url = GET_CHARACTER_API_URl.replace("{id}", id);
    return (await (await fetch(url)).json()).character || {};
  } catch (e) {
    console.log(e);
  }
});

export const useFetchCharacter = () => {
  const [character, updateCharacter] = useState();

  const fetchCharacter = useCallback(async id => {
    const character = await getCharacter(id);
    updateCharacter(character);
  }, []);

  return [character, fetchCharacter];
};
