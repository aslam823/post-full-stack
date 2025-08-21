import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AuthService } from "../authService";

@Component({
    templateUrl: "./loginCmp.html",
    styleUrls: ["./loginCmp.css"],
    standalone: false,
})
export class Login {
    isLoading: boolean = false;

    constructor(public authServive: AuthService) {}

    onLogin(form: NgForm) {
        if (form.invalid) {
            return;
        }
        this.isLoading = true;
        this.authServive.login(form.value.email, form.value.password);
        this.isLoading = false;
        form.resetForm();
    }
}