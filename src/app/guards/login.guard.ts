import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../Services/user.service';

@Injectable({
	providedIn: 'root'
})
export class LoginGuard implements CanActivate {
	constructor(
		private userService: UserService,
		private router: Router
	) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if (!this.userService.isLoggedIn) {
			return true;
		}
    this.router.navigate(['/produtos']);
		return false;
	}
}
