import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Pages } from '@app/shared/helpers/routes.helper';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
class PermissionsService {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log('[AuthGuard]', this.auth.isLoggedIn());
    if (!this.auth.isLoggedIn()) {
      this.router.navigate([Pages.LOGIN]);
      return false;
    }
    return true;
  }
}

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(PermissionsService).canActivate(next, state);
};
