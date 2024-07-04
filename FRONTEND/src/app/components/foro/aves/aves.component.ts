import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PostsService } from '../../../services/posts.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aves',
  standalone: true,
  imports: [ RouterLink, RouterOutlet, CommonModule],
  templateUrl: './aves.component.html',
  styleUrl: '../categoriasm.component.css'
})
export class AvesComponent {
  posts: any[] = [];

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    const avesTypeId = 5;
    this.postsService.getPostsByAnimalType(avesTypeId).subscribe(
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
