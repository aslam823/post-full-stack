import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./authService";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {
    isAuthenticated = false;
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
        this.isAuthenticated = this.authService.getIsAuth();
        if (!this.isAuthenticated) {
            this.router.navigate(["/login"]);
            return false;
        }
        return true;
    }

}