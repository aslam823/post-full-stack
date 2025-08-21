import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Login } from "./login/loginCmp";
import { Signup } from "./signup/signupCmp";
import { AngularMaterialModule } from "../../angular-material-module";
import { AuthRoutingModule } from "./auth-routing-module";

@NgModule({
  declarations: [Login, Signup],
  imports: [CommonModule, FormsModule, AngularMaterialModule, AuthRoutingModule]
})
export class AuthModule {}
