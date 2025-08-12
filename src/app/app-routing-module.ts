import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostList } from './features/posts/post-list/postListCmp';
import { PostCreate } from './features/posts/post-create/postCreateCmp';

const routes: Routes = [
  { path: '', component: PostList},
  { path: 'create', component: PostCreate},
  { path: 'edit/:postId', component: PostCreate}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
