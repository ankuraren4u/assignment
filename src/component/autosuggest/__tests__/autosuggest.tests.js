import { Autosuggest } from "..";
import { felaShallow } from "./../../../test-utils/";

describe("<Autosuggest />", () => {
  it("Init Test", () => {
    const suggestions = [];
    const onQueryChange = jest.fn();
    const onSelectionChange = jest.fn();

    const component = felaShallow(
      <Autosuggest
        onQueryChange={onQueryChange}
        suggestions={suggestions}
        onSelectionChange={onSelectionChange}
      />
    );
    expect(component.html()).toMatchSnapshot();
    /** TODO : Write tests */
  });
});
