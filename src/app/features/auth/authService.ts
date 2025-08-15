import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthData } from "./auth-data";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private token: string = "";
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post("http://localhost:3000/api/user/signup", authData).subscribe(
      (response) => {
        console.log("User created successfully", response);
      },
      (error) => {
        console.error("Error creating user", error);
      }
    );
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{ token: string }>("http://localhost:3000/api/user/login", authData)
      .subscribe((response) => {
        if (response.token) {
          this.token = response.token;
          this.authStatusListener.next(true);
          this.router.navigate(["/"]);
        }
      });
  }

  logout() {
    this.token = "";
    this.authStatusListener.next(false);
    this.router.navigate(["/login"]);
  }
}
