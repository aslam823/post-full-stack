import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AuthService } from "../authService";

@Component({
    templateUrl: "./signupCmp.html",
    imports: [MatCardModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, CommonModule, FormsModule],
    styleUrls: ["./signupCmp.css"]
})
export class Signup {
    isLoading: boolean = false;

    constructor(public authService: AuthService) {}

    onSignup(form: NgForm) {
        if (form.invalid) {
            return; 
        }
        this.isLoading = true;
        this.authService.createUser(form.value.email, form.value.password);
    }
}