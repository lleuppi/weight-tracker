import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlSegmentGroup, UrlTree } from "@angular/router";
import { AuthService } from "@auth0/auth0-angular";
import { Observable } from "rxjs";

@Injectable()
export class RequireAuthentication implements CanActivate {
    constructor(private auth: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        return new Observable<GuardResult>(subscribe =>
            this.auth.isAuthenticated$.subscribe(isAuthenticated => {
                console.log('Checking!')
                if (!isAuthenticated){
                    this.auth.loginWithRedirect();
                    subscribe.next(false);
                }

                subscribe.next(true);
            }));
    }
}