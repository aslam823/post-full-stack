import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { PostService } from "../postService";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../post";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { mimeType } from "./mime-type.validator";

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
    MatProgressSpinnerModule,
    ReactiveFormsModule
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
  form!: FormGroup;
  imagePreview!: string;
  constructor(public postService: PostService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      content: new FormControl(null, {validators: [Validators.required, Validators.minLength(5)]}),
      image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
    });
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
            imagePath: postData.imagePath,
            creator: postData.creator
          };
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            image: this.post.imagePath
          });
        });
        this.isLoading = false;
      } else {
        this.mode = "create";
        this.postId = "";
      }
    });
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "edit") {
      this.postService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    } else {
      this.postService.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
    }
    this.form.reset();
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.form.patchValue({ image: file });
    this.form.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file as Blob);
  }
}
