import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterLink } from "@angular/router";
import { AuthService } from "../auth/authService";
import { Subscription } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-header",
  templateUrl: "./headerCmp.html",
  imports: [MatToolbarModule, RouterLink, MatButtonModule, CommonModule],
  styleUrl: "./headerCmp.css",
})
export class Header implements OnInit, OnDestroy {
  isAuthenticated = false;
  private authListenerSubs!: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.authListenerSubs) {
      this.authListenerSubs.unsubscribe();
    }
  }
}
