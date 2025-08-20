import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ErrorComponent } from "./errorCmp";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public dialog: MatDialog) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
            this.dialog.open(ErrorComponent, {data: {message: error.error.message || "An unknown error occurred!"}});
            return throwError(error);
        })
        );
    }
}