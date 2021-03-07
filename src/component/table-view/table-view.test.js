import { TableView } from ".";
import {felaShallow, felaMount} from "../../test-utils/";

const obj = {
    testKey1: "testValue1",
    testKey2: "testValue2"
}

describe('<TableView />', () => {

  describe('By default', () => {
    let component;
    beforeAll(() => {
      component = felaShallow(<TableView obj={obj} />);
    });
    
    it('renders', () => {
      expect(component.html()).toMatchSnapshot();
    }, );
  });
})