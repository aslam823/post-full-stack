import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { Post } from "../post";
import { PostService } from "../postService";
import { Subscription } from "rxjs";
import { RouterLink } from "@angular/router";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';

@Component({
  selector: "app-post-list",
  templateUrl: "./postListCmp.html",
  styleUrls: ["./postListCmp.css"],
  imports: [MatExpansionModule, MatIconModule, RouterLink, MatProgressSpinnerModule, CommonModule, MatPaginatorModule],
})
export class PostList implements OnInit {
  posts: Post[] = [];
  isLoading: boolean = false;
  totalPosts: number = 0;
  pageSize: number = 2;
  pageSizeOptions: number[] = [1, 2, 5, 10];
  currentPage: number = 1;
  private postsSub!: Subscription;

  constructor(private postServive: PostService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.postServive.getPosts(this.pageSize, this.currentPage);
    this.postsSub = this.postServive
      .getPostUpdateListener()
      .subscribe((postData: {posts: Post[], postCount: number}) => {
        this.isLoading = false;
        this.posts = postData.posts;
        this.totalPosts = postData.postCount;
      });
  }

  ngDestroy(): void {
    if (this.postsSub) {
      this.postsSub.unsubscribe();
    }
  }

  deletePost(id: string) {
    this.isLoading = true;
    this.postServive.deletePost(id).subscribe(() => {
      this.postServive.getPosts(this.pageSize, this.currentPage)});
  }

  onPageChange(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.pageSize = pageData.pageSize;
    this.postServive.getPosts(this.pageSize, this.currentPage);
  }
}
