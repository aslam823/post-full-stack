import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { PostList } from './features/posts/post-list/postListCmp';
import { PostCreate } from './features/posts/post-create/postCreateCmp';
import { Header } from './features/header/headerCmp';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Login } from './features/auth/login/loginCmp';
import { NgForm } from '@angular/forms';
import { Signup } from './features/auth/signup/signupCmp';
import { AuthInterceptor } from './features/auth/auth-interceptor';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PostCreate,
    Header,
    PostList,
    Login,
    Signup
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [App]
})
export class AppModule { }
