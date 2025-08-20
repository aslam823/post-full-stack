import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";

@Component({
    templateUrl: "./errorCmp.html",
    imports: [MatDialogModule],
})
export class ErrorComponent {
    message: string = "An error occurred!";

    constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string}) {}
}