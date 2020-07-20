import { Injectable } from '@angular/core';
import { BasicAuthService } from '../auth/basic-auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardPublicService implements CanActivate {

  constructor(private auth: BasicAuthService,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.auth.isLoggedIn())
      return true;
    this.router.navigate(['/home']);
    return true;
  }

}
