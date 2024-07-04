import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PostsService } from '../../../services/posts.service';

@Component({
  selector: 'app-otros',
  standalone: true,
  imports: [ RouterLink, RouterOutlet, CommonModule],
  templateUrl: './otros.component.html',
  styleUrl: '../categoriasm.component.css'
})
export class OtrosComponent {
  posts: any[] = [];

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    const otrosTypeId = 7;
    this.postsService.getPostsByAnimalType(otrosTypeId).subscribe(
      (data: any[]) => {
        this.posts = data.map(post => {
          console.log(post.user.profileImageUrl);
          return post;
        });
        console.log(this.posts);
      },
      (error) => {
        console.error('Error loading posts:', error);
      }
    );
  }
}
