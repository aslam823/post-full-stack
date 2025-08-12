import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { Post } from "../post";
import { PostService } from "../postService";
import { Subscription } from "rxjs";
import { RouterLink } from "@angular/router";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "app-post-list",
  templateUrl: "./postListCmp.html",
  styleUrls: ["./postListCmp.css"],
  imports: [MatExpansionModule, CommonModule, MatIconModule, RouterLink, MatProgressSpinnerModule],
})
export class PostList implements OnInit {
  posts: Post[] = [];
  isLoading: boolean = false;
  private postsSub!: Subscription;

  constructor(public postServive: PostService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.postServive.getPosts();
    this.postsSub = this.postServive
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }

  ngDestroy(): void {
    if (this.postsSub) {
      this.postsSub.unsubscribe();
    }
  }

  editPost() {
    // Logic for editing a post can be implemented here
  }

  deletePost(id: string) {
    this.postServive.deletePost(id);
  }
}
