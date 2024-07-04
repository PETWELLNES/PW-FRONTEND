import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PostsService } from '../../../services/posts.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-peces',
  standalone: true,
  imports: [ RouterLink, RouterOutlet, CommonModule],
  templateUrl: './peces.component.html',
  styleUrl: '../categoriasm.component.css'
})
export class PecesComponent {
  posts: any[] = [];

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    const pecesTypeId = 3;
    this.postsService.getPostsByAnimalType(pecesTypeId).subscribe(
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
