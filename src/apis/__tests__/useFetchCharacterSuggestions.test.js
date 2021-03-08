import { renderHook, act } from "@testing-library/react-hooks";
import { debounce } from "lodash";
import fetchMock from "jest-fetch-mock";
import { useHistory } from "react-router-dom";

import { useFetchCharacterSuggestions } from "..";
import { GET_CHARACTER_SUGGESTION_API_URl } from "../const";

const testString = "abc";
const testID = 1;
const mockBody = {
  characters: [{ id: 1, name: "test1" }, { id: 1, name: "test2" }]
};

jest.mock("lodash", () => {
  const module = jest.requireActual("lodash");
  return {
    ...module,
    debounce: fn => fn
  };
});

jest.mock("react-router-dom", () => {
  const fn = jest.fn();
  return {
    useHistory: () => ({
      push: fn
    })
  };
});

fetchMock.enableMocks();

const getHook = initialState => {
  return renderHook(() => useFetchCharacterSuggestions(initialState));
};

describe("useFetchCharacterSuggestions Hook", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("initialState", () => {
    const { result } = getHook([]);
    const [
      characters,
      fetchCharacters,
      navigateToCharacter,
      clearCharacters
    ] = result.current;
    expect(characters).toEqual([]);
    expect(fetchCharacters).toBeInstanceOf(Function);
    expect(navigateToCharacter).toBeInstanceOf(Function);
    expect(clearCharacters).toBeInstanceOf(Function);
  });

  it("api call", async () => {
    const { result, waitForNextUpdate } = getHook([]);

    fetch.once(JSON.stringify(mockBody));

    await act(async () => {
      // Fetch Characters
      result.current[1](testString);
      await waitForNextUpdate();
    });

    expect(fetch).toHaveBeenCalledWith(
      GET_CHARACTER_SUGGESTION_API_URl.replace("{query}", testString)
    );
    //Character
    expect(result.current[0]).toEqual(mockBody.characters);
  });

  it("clear characters", () => {
    const { result } = getHook([]);

    fetch.once(JSON.stringify(mockBody));

    act(() => {
      // clear Characters
      result.current[2]({ id: testID });
    });
    expect(useHistory().push).toHaveBeenCalledWith(`/character/${testID}`);
  });

  it("clear characters", () => {
    const { result } = getHook([]);

    fetch.once(JSON.stringify(mockBody));

    act(() => {
      // clear Characters
      result.current[3]();
    });

    expect(result.current[0]).toEqual([]);
  });
});
