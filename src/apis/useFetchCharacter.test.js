import { renderHook, act } from "@testing-library/react-hooks";
import { debounce } from "lodash";
import fetchMock from "jest-fetch-mock";
import { useFetchCharacter } from ".";
import { GET_CHARACTER_API_URl } from "./const";

jest.mock("lodash", () => {
  const module = jest.requireActual("lodash");
  return {
    ...module,
    debounce: fn => fn
  };
});

fetchMock.enableMocks();

const getHook = initialState => {
  return renderHook(() => useFetchCharacter());
};

const testID = 1;
const mockBody = {
  character: { id: 1, name: "test1" }
};

describe("useFetchCharacter Hook", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("initialState", () => {
    const { result } = getHook([]);
    const [
      character,
      updateCharacter,
    ] = result.current;
    expect(character).toEqual(undefined);
    expect(updateCharacter).toBeInstanceOf(Function);
  });

  it("api call", async () => {
    const { result, waitForNextUpdate } = getHook([]);
    const [
      character,
      fetchCharacter,
    ] = result.current;

    fetch.once(JSON.stringify(mockBody));

        
    await act(async () => {
        fetchCharacter(testID)
        await waitForNextUpdate();
    });

    expect(fetch).toHaveBeenCalledWith(
        GET_CHARACTER_API_URl.replace("{id}", testID)
    );
    expect(result.current[0]).toEqual(mockBody.character)
  });
});