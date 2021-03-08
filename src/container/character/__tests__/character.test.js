import { act } from "@testing-library/react";
import { MemoryRouter, Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import { waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";

import { felaMount } from "./../../../test-utils/";
import { Character } from "..";

fetchMock.enableMocks();

const mockBody = [
  {
    character: { id: 1, name: "test1" }
  },
  {
    character: { id: 2, name: "test2" }
  },
  {
    character: { id: 3, name: "test3" }
  }
];

describe("<Character />", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  describe("By default", () => {
    it("renders", async () => {
      fetch.once(JSON.stringify(mockBody[0]));
      let component;
      await act(async () => {
        component = felaMount(
          <MemoryRouter
            initialEntries={[`/character/${mockBody[0].character.id}`]}
          >
            <Route path="/character/:id">
              <Character />
            </Route>
          </MemoryRouter>
        );
      });

      expect(component.html()).toMatchSnapshot();
    });

    it("should render the fetched result", async () => {
      let component;
      const history = createMemoryHistory();
      history.push(`/character/${mockBody[1].character.id}`);

      fetch.once(JSON.stringify(mockBody[1]));
      await act(async () => {
        fetch.once(JSON.stringify(mockBody[0]));
        component = felaMount(
          <Router history={history}>
            <Route path="/character/:id">
              <Character />
            </Route>
          </Router>
        );
      });

      expect(fetch).toHaveBeenCalled();
      expect(component.html()).toMatchSnapshot();
      expect(component.find(".ui-container").exists()).toBeTruthy();

      await act(async () => {
        fetch.once(JSON.stringify(mockBody[2]));
        history.push(`/character/${mockBody[2].character.id}`);
      });
      expect(fetch).toHaveBeenCalled();
      waitFor(() => {
        expect(component.html()).toMatch(mockBody[2].character.name);
      });
    });
  });
});
