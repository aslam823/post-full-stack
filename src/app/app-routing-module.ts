import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostList } from './features/posts/post-list/postListCmp';
import { PostCreate } from './features/posts/post-create/postCreateCmp';
import { Login } from './features/auth/login/loginCmp';
import { Signup } from './features/auth/signup/signupCmp';
import { AuthGuard } from './features/auth/auth-guard';

const routes: Routes = [
  { path: '', component: PostList, canActivate: [AuthGuard] },
  { path: 'posts', component: PostList, canActivate: [AuthGuard] },
  { path: 'create', component: PostCreate, canActivate: [AuthGuard] },
  { path: 'edit/:postId', component: PostCreate, canActivate: [AuthGuard] },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
