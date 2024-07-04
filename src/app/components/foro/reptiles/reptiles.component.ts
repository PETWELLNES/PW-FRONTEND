import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PostsService } from '../../../services/posts.service';

@Component({
  selector: 'app-reptiles',
  standalone: true,
  imports: [ RouterLink, RouterOutlet, CommonModule ],
  templateUrl: './reptiles.component.html',
  styleUrl: '../categoriasm.component.css'
})
export class ReptilesComponent {
  posts: any[] = [];

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    const reptilesTypeId = 6;
    this.postsService.getPostsByAnimalType(reptilesTypeId).subscribe(
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
