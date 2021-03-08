import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { createRenderer } from "fela";
import { RendererProvider, ThemeProvider } from "react-fela";

import { theme } from "./../theme";
Enzyme.configure({ adapter: new Adapter() });

const renderer = createRenderer();

export const felaShallow = node =>
  shallow(
    <RendererProvider renderer={renderer}>
      <ThemeProvider theme={theme}>{node}</ThemeProvider>
    </RendererProvider>
  );

export const felaMount = node =>
  mount(
    <RendererProvider renderer={renderer}>
      <ThemeProvider theme={theme}>{node}</ThemeProvider>
    </RendererProvider>
  );
