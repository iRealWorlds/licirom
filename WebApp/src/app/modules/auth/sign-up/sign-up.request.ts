import { AuthSessionCreateRequest } from '@licirom/core/auth/auth-session-create.request';

export class SignUpRequest extends AuthSessionCreateRequest {
  override emailAddress?: string;
  override password?: string;
  firstName?: string;
  lastName?: string;

  /**
   * SignUpRequest constructor method.
   *
   * @param initial
   */
  constructor(initial?: Partial<SignUpRequest>) {
    super(initial);
    if (initial) {
      Object.assign(this, initial);
    }
  }
}
