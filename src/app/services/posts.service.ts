import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { User } from '../models/user';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private apiUrl = 'https://petwellness.onrender.com/api/v1';

  constructor(private http: HttpClient) {}

  getAnimalTypes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pet-type`);
  }

  getBreedsByType(typeId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/pet-breed/by-type?typeId=${typeId}`);
  }

  getTopics(): Observable<any> {
    return this.http.get(`${this.apiUrl}/topic`);
  }

  createPost(postData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/post`, postData);
  }

  getRecentPostsGroupedByType(): Observable<any> {
    return this.http.get(`${this.apiUrl}/post/recent-grouped`);
  }

  getPostById(postId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/post/${postId}`);
  }

  getResponsesByParentPostId(parentPostId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/post/${parentPostId}/responses`);
  }

  getPostsByAnimalType(animalTypeId: number): Observable<any[]> {
    return this.http
      .get<any[]>(
        `${this.apiUrl}/post/by-animal-type?animalTypeId=${animalTypeId}`
      )
      .pipe(
        switchMap((posts: any[]) => {
          const userRequests = posts.map((post) =>
            this.http.get<User>(`${this.apiUrl}/user/${post.userId}`)
          );
          return forkJoin(userRequests).pipe(
            map((users: User[]) => {
              return posts.map((post, index) => {
                const user = users[index];
                if (user && user.profileImageUrl) {
                  if (!user.profileImageUrl.startsWith('http')) {
                    user.profileImageUrl = `http://localhost:8080${user.profileImageUrl}`;
                  }
                } else {
                  user.profileImageUrl = '../../assets/perrito.png';
                }
                return {
                  ...post,
                  user: user,
                };
              });
            })
          );
        })
      );
  }

  getPostsByBreed(breedId: number): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/post/by-breed?breedId=${breedId}`)
      .pipe(
        switchMap((posts: any[]) => {
          const userRequests = posts.map((post) =>
            this.http.get<User>(`${this.apiUrl}/user/${post.userId}`)
          );
          return forkJoin(userRequests).pipe(
            map((users: User[]) => {
              return posts.map((post, index) => {
                const user = users[index];
                if (user && user.profileImageUrl) {
                  if (!user.profileImageUrl.startsWith('http')) {
                    user.profileImageUrl = `http://localhost:8080${user.profileImageUrl}`;
                  }
                } else {
                  user.profileImageUrl = '../../assets/perrito.png';
                }
                return {
                  ...post,
                  user: user,
                };
              });
            })
          );
        })
      );
  }

  updatePost(postId: number, postData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/post/${postId}`, postData);
  }

  getPostsByUserId(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(
      `${this.apiUrl}/post/by-user?userId=${userId}`
    );
  }

  deletePost(postId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/post/${postId}`);
  }
}
