import { Layout } from 'src/app/layout/layout.enum';

export class EnvironmentConfig {
  production = true;
  defaultLayout = Layout.Navbar;

  api = {
    baseUri: 'https://127.0.0.1:8000',
    endpoints: {
      authSessions: 'api/AuthSessions'
    }
  };

  /**
   * EnvironmentConfig constructor method.
   *
   * @param initial
   */
  constructor(initial?: Partial<EnvironmentConfig>) {
    Object.assign(this, initial);
  }
}
