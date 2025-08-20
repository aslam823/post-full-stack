import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AuthService } from "../authService";
import { Subscription } from "rxjs";

@Component({
    templateUrl: "./signupCmp.html",
    imports: [MatCardModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, CommonModule, FormsModule],
    styleUrls: ["./signupCmp.css"]
})
export class Signup implements OnInit, OnDestroy {
    isLoading: boolean = false;
    private authListenerSubs!: Subscription;

    constructor(public authService: AuthService) {}

    ngOnInit() {
        this.authListenerSubs = this.authService.getAuthStatusListener().subscribe((isAuthenticated) => {
            this.isLoading = false;

        });
    }

    ngOnDestroy() {

        if (this.authListenerSubs) {
            this.authListenerSubs.unsubscribe();    
        }
    }

    onSignup(form: NgForm) {
        if (form.invalid) {
            return; 
        }
        this.isLoading = true;
        this.authService.createUser(form.value.email, form.value.password);
    }
}