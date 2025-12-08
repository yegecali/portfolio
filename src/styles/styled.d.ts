import "styled-components";
import type { lightTheme } from "./theme";

declare module "styled-components" {
  type Theme = typeof lightTheme;
  export interface DefaultTheme extends Theme {}
}
