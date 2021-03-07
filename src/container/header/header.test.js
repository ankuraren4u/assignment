import { Header } from ".";
import { felaShallow } from "../../test-utils/";
describe("<Header />", () => {
  describe("By default", () => {
    let component;
    beforeAll(() => {
      component = felaShallow(<Header />);
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
