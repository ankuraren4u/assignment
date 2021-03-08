import { HeaderBar } from "..";
import { felaShallow } from "./../../../test-utils/";
describe("<HeaderBar />", () => {
  describe('By default', () => {
    let component;
    beforeAll(() => {
      component = felaShallow(<HeaderBar>TEST</HeaderBar>);
    });

    it('renders', () => {
      expect(component.html()).toMatchSnapshot();
    }, );

    it('does nothing on clicks', () => {
      let clickEvent = () => {
        component.simulate('click');
      };
      expect(clickEvent).not.toThrow();
    });
  });
});
