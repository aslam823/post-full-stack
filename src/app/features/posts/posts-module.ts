import { NgModule } from "@angular/core";
import { PostCreate } from "./post-create/postCreateCmp";
import { PostList } from "./post-list/postListCmp";
import { AngularMaterialModule } from "../../angular-material-module";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [PostCreate, PostList],
  imports: [
    AngularMaterialModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class PostsModule {}
