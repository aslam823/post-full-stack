import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthData } from "./auth-data";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";


const API_URL = environment.apiUrl + '/user';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private token: string = "";
  private isAuthenticated = false;
  private tokenTimer: number = 0;
  private currentUserId: string = "";
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getCurrentUserId() {
    return this.currentUserId;
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post( API_URL + "/signup", authData).subscribe(() => {
      this.router.navigate(["/user/login"]);
    },
    (error) => {
      console.error("Signup failed:", error);
      this.authStatusListener.next(false);
      this.isAuthenticated = false;
    });
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post<{ token: string, expiresIn:number, userId: string }>(API_URL + "/login", authData)
      .subscribe((response) => {
        if (response.token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.token = response.token;
          this.currentUserId = response.userId;
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.saveAuthData(this.token, new Date(new Date().getTime() + expiresInDuration * 1000));
          this.router.navigate(["/"]);
        }
      }, (error) => {
        console.error("Login failed:", error);
        this.authStatusListener.next(false);
        this.isAuthenticated = false;
      });
  }

  autoAuthUser() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return;
    }
    const expiresIn = new Date(expirationDate).getTime() - new Date().getTime();
    if (expiresIn > 0) {
      this.token = token;
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      this.setAuthTimer(expiresIn/1000);
      this.router.navigate(["/"]);
    }
  }

  logout() {
    this.token = "";
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/user/login"]);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }
}
