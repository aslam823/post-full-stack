import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './features/header/headerCmp';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Login } from './features/auth/login/loginCmp';
import { Signup } from './features/auth/signup/signupCmp';
import { AuthInterceptor } from './features/auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './errorCmp';
import { AngularMaterialModule } from './angular-material-module';
import { PostsModule } from './features/posts/posts-module';
import { AuthModule } from './features/auth/auth-module';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularMaterialModule,
    Header,
    ErrorComponent,
    PostsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [App]
})
export class AppModule { }
