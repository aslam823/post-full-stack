import { Component } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './headerCmp.html',
    imports: [MatToolbarModule, RouterLink, MatButton],
    styleUrl: './headerCmp.css'
})
export class Header {}