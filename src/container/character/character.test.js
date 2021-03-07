import { Character } from ".";
import { felaShallow } from "../../test-utils/";
// import {useParams} from "react-router-dom";

jest.mock("react-router-dom", () => {
  return {
    useParams: () => ({
      id: 1
    })
  };
});

describe("<Character />", () => {
  describe("By default", () => {
    let component;
    beforeAll(() => {
      // useParams() //.mockReturnValue({id: 1});
      component = felaShallow(<Character />);
    });

    it("renders", () => {
      expect(component.html()).toMatchSnapshot();
    });

    it("does nothing on clicks", () => {
      let clickEvent = () => {
        component.simulate("click");
      };
      expect(clickEvent).not.toThrow();
    });
  });
});
