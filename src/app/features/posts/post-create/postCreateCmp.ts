import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { PostService } from "../postService";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../post";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: "app-post-create",
  templateUrl: "./postCreateCmp.html",
  styleUrls: ["./postCreateCmp.css"],
  imports: [
    MatCardModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
})
export class PostCreate implements OnInit {
  mode = "create";
  postId: string = "";
  post: Post = {
    id: "",
    title: "",
    content: "",
  } as Post;
  isLoading: boolean = false;
  constructor(public postService: PostService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId") || "";
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe((postData: any) => {
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
          };
        });
        this.isLoading = false;
      } else {
        this.mode = "create";
        this.postId = "";
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "edit") {
      this.postService.updatePost(
        this.postId,
        form.value.title,
        form.value.content
      );
    } else {
      this.postService.addPost(form.value.title, form.value.content);
    }
    form.resetForm();
  }
}
