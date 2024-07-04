import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../services/posts.service';
import { AuthService } from '../../../services/auth.service';
import { Post } from '../../../models/post';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  userId: number | null = null;

  constructor(
    private postsService: PostsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userId = parseInt(localStorage.getItem('userId') || '0', 10);
    if (this.userId) {
      this.loadUserPosts(this.userId);
    }
  }

  loadUserPosts(userId: number) {
    this.postsService.getPostsByUserId(userId).subscribe(
      (data: Post[]) => {
        this.posts = data;
      },
      (error) => {
        console.error('Error loading user posts:', error);
      }
    );
  }

  confirmDeletePost(postId: number) {
    const confirmDelete = window.confirm(
      '¿Estás seguro de que quieres eliminar este post?'
    );
    if (confirmDelete) {
      this.deletePost(postId);
    }
  }

  deletePost(postId: number) {
    this.postsService.deletePost(postId).subscribe(
      () => {
        this.posts = this.posts.filter((post) => post.postId !== postId);
      },
      (error) => {
        console.error('Error deleting post:', error);
      }
    );
  }
}
