import { Component } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";

@Component({
    selector: 'app-header',
    templateUrl: './headerCmp.html',
    imports: [MatToolbarModule],
})
export class Header {}