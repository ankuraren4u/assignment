import { Autosuggest } from "..";
import { felaShallow } from "./../../../test-utils/";

describe("<Autosuggest />", () => {
  it("Init Test", () => {
    const component = felaShallow(<Autosuggest/>);
    expect(component.html()).toMatchSnapshot();
    /** TODO : Write tests */
  });
});
