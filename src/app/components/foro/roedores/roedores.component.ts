import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PostsService } from '../../../services/posts.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roedores',
  standalone: true,
  imports: [ RouterLink, RouterOutlet, CommonModule ],
  templateUrl: './roedores.component.html',
  styleUrl: '../categoriasm.component.css'
})
export class RoedoresComponent {
  posts: any[] = [];

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    const roedoresTypeId = 4;
    this.postsService.getPostsByAnimalType(roedoresTypeId).subscribe(
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
