import { Layout } from 'src/app/layout/layout.enum';

export class EnvironmentConfig {
  production = true;
  defaultLayout = Layout.Navbar;

  /**
   * EnvironmentConfig constructor method.
   *
   * @param initial
   */
  constructor(initial?: Partial<EnvironmentConfig>) {
    Object.assign(this, initial);
  }
}
