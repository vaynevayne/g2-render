import { customElement } from "solid-element";
import MyComponent from "./MyComponent";

import parser from "./parser";
customElement(
  "g2-render",
  { data: undefined, scope: {}, json: "", "init-config": {}, debug: false },
  MyComponent
);
export { parser };
