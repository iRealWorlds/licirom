export class EnvironmentConfig {
  production = true;

  /**
   * EnvironmentConfig constructor method.
   *
   * @param initial
   */
  constructor(initial?: Partial<EnvironmentConfig>) {
    Object.assign(this, initial);
  }
}
