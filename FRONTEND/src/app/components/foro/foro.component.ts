import { RouterLink, RouterOutlet } from '@angular/router';
import { UiService } from './../../services/ui.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { PerrosComponent } from './perros/perros.component';
import { PostFormComponent } from './post-form/post-form.component';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-foro',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    MatMenu,
    MatMenuTrigger,
    CommonModule,
    PerrosComponent,
    PostFormComponent,
  ],
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.css'],
})
export class ForoComponent implements OnInit, OnDestroy {
  recentPostsGroupedByType: { [key: string]: any[] } = {};
  petTypesOrder: string[] = [
    'Perro',
    'Gato',
    'Pez',
    'Roedor',
    'Ave',
    'Reptil',
    'Otro',
  ];

  constructor(
    private UiService: UiService,
    private postsService: PostsService
  ) {}

  ngOnInit() {
    this.UiService.toggleMainContent(false);
    this.loadRecentPosts();
  }

  ngOnDestroy() {
    this.UiService.toggleMainContent(true);
  }

  loadRecentPosts() {
    this.postsService.getRecentPostsGroupedByType().subscribe((data: any) => {
      this.recentPostsGroupedByType = data;
    });
  }

  includeAllPetTypes(data: { [key: string]: any[] }): { [key: string]: any[] } {
    const allPetTypes = this.petTypesOrder.reduce((acc, type) => {
      acc[type] = data[type] ? data[type].slice(0, 5) : [];
      return acc;
    }, {} as { [key: string]: any[] });
    return allPetTypes;
  }

  getIconName(type: string): string {
    switch (type.toLowerCase()) {
      case 'perro':
        return 'dog.png';
      case 'gato':
        return 'cat.png';
      case 'pez':
        return 'fish.png';
      case 'roedor':
        return 'rabbit.png';
      case 'ave':
        return 'bird.png';
      case 'reptil':
        return 'snake.png';
      case 'otro':
        return 'horse.png';
      default:
        return 'default.png';
    }
  }

}