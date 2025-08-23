import { Injectable } from "@angular/core";
import { Post } from "./post";
import { map, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

const API_URL = 'http://localhost:8080/api/posts';

@Injectable({
  providedIn: "root",
})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{posts: Post[], postCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(pageSize: number, currentPage: number) {
    const queryParams = `?pageSize=${pageSize}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any, maxPosts: number }>(API_URL + queryParams)
      .pipe(
        map((postData) => {
          return {
            posts: postData.posts.map((post: any) => {
              return {
                id: post._id,
                title: post.title,
                content: post.content,
                imagePath: post.imagePath,
                creator: post.creator
              };
            }),
            postCount: postData.maxPosts
          };
        })
      )
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts.posts;
        this.postsUpdated.next({posts:[...this.posts], postCount: transformedPosts.postCount});
      });
  }

  getPost(id: string) {
    return this.http.get<{ _id: string; title: string; content: string, imagePath: string, creator: string }>(
      `${API_URL}/${id}`
    );
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
    
    this.http
      .post<{ message: string; post: Post }>(
        API_URL,
        postData
      )
      .subscribe((responseData) => {
        this.router.navigate(["/"]);
      });
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof image === "object") {
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
        creator: ''
    }
  }
    this.http
      .put(`${API_URL}/${id}`, postData)
      .subscribe((response) => {
        this.router.navigate(["/"]);
      });
  }

  deletePost(id: string) {
    return this.http.delete(`${API_URL}/${id}`);
  }
}
