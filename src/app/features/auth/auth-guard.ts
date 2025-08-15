import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./authService";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {
    isAuthenticated = false;
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
        console.log("AuthGuard: Checking authentication status");
        this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
            this.isAuthenticated = isAuthenticated;
        });
        if (!this.isAuthenticated) {
            console.log("AuthGuard: User is not authenticated, redirecting to login");
            this.router.navigate(["/login"]);
            return false;
        }
        console.log("AuthGuard: User is authenticated, access granted");
        return true;
    }

}