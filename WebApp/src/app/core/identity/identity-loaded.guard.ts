import { inject } from '@angular/core';
import {
  CanActivateChildFn,
  CanActivateFn,
} from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { IdentityService } from '@licirom/core/identity/identity.service';

/**
 * Make sure that a request has been sent to the API to check the current identity.
 */
export const identityLoadedGuard: CanActivateFn|CanActivateChildFn = async (): Promise<boolean> => {
  const identityService = inject(IdentityService);
  const currentIdentity = await firstValueFrom(identityService.currentIdentity$);

  if (currentIdentity === undefined) {
    try {
      await firstValueFrom(identityService.getIdentity());
    } catch (error) {
      return false;
    }
  }

  return true;
};
