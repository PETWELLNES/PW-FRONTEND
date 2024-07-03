import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostsService } from '../../../services/posts.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perros',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './perros.component.html',
  styleUrls: ['../categoriasm.component.css'],
})
export class PerrosComponent implements OnInit {
  posts: any[] = [];
  breeds: any[] = [];
  selectedBreedId: number | null = null;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.loadBreeds();
    this.loadPosts();
  }

  loadBreeds() {
    const perrosTypeId = 1;
    this.postsService.getBreedsByType(perrosTypeId).subscribe(
      (data: any[]) => {
        this.breeds = data;
      },
      (error) => {
        console.error('Error loading breeds:', error);
      }
    );
  }

  loadPosts() {
    const perrosTypeId = 1;
    this.postsService.getPostsByAnimalType(perrosTypeId).subscribe(
      (data: any[]) => {
        this.posts = data;
      },
      (error) => {
        console.error('Error loading posts:', error);
      }
    );
  }

  loadPostsByBreed(breedId: number) {
    this.postsService.getPostsByBreed(breedId).subscribe(
      (data: any[]) => {
        this.posts = data;
        if (this.posts.length === 0) {
          console.log('No posts found for this breed');
        }
      },
      (error) => {
        console.error('Error loading posts by breed:', error);
        this.posts = [];
      }
    );
  }

  onBreedChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const breedId = Number(selectElement.value);
    if (breedId) {
      this.loadPostsByBreed(breedId);
    } else {
      this.loadPosts();
    }
  }
}
