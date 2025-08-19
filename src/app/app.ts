import { Component, OnInit, signal } from "@angular/core";
import { AuthService } from "./features/auth/authService";

@Component({
  selector: "app-root",
  templateUrl: "./app.html",
  standalone: false,
  styleUrl: "./app.css",
})
export class App implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
