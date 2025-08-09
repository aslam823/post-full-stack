import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { Post } from "../post";
import { PostService } from "../postService";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-post-list',
    templateUrl: './postListCmp.html',
    styleUrls: ['./postListCmp.css'],
    imports: [MatExpansionModule, CommonModule, MatIconModule]
})
export class PostList implements OnInit {
    posts: Post[] = [];
    private postsSub!: Subscription;

    constructor(public postServive: PostService) {}

    ngOnInit(): void {
        this.postServive.getPosts();
        this.postsSub = this.postServive.getPostUpdateListener()
            .subscribe((posts: Post[]) => {
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

    deletePost() {
        // Logic for deleting a post can be implemented here
    }
}
