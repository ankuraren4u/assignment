import { Character } from "..";
import { act, renderHook } from "@testing-library/react-hooks";

import { felaShallow } from "./../../../test-utils/";
import { MemoryRouter, Route, useHistory } from "react-router-dom";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

const mockBody = [
  {
    character: { id: 1, name: "test1" }
  },
  {
    character: { id: 2, name: "test2" }
  }
];

describe("<Character />", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  describe("By default", () => {
    let component;
    beforeAll(() => {
      fetch.mockResponse(JSON.stringify(mockBody));
      component = felaShallow(
        <MemoryRouter initialEntries={[`/character/${mockBody[0].character.id}`]}>
          <Route path="/character/:id">
            <Character />
          </Route>
        </MemoryRouter>
      );
    });

    it("renders", () => {
      expect(component.html()).toMatchSnapshot();
    });

    // it("should render the fetched result", () => {
    //   act(() => {
    //     expect(fetch).toHaveBeenCalled();
    //   })
    // });

    // it("should render the fetched result", () => {
    //   act(() => {
    //     const history = useHistory();
    //     history.push(`/character/${mockBody[1].character.id}`);
    //   });

    //   // act(() => {
    //   //   expect(fetch).toHaveBeenCalled();
    //   // })
    // });
  });

  
});
