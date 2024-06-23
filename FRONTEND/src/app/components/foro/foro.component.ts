import { RouterLink, RouterOutlet } from '@angular/router';
import { UiService } from './../../services/ui.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
import { PerrosComponent } from './perros/perros.component';
import { PostComponent } from './post/post.component';

@Component({
  selector: 'app-foro',
  standalone: true,
  imports: [RouterLink,RouterOutlet, MatMenu, MatMenuTrigger, CommonModule, 
    DropdownMenuComponent, PerrosComponent, PostComponent],
  templateUrl: './foro.component.html',
  styleUrl: './foro.component.css',
})
export class ForoComponent implements OnInit, OnDestroy {
  constructor(private UiService: UiService) {}

  ngOnInit() {
    this.UiService.toggleMainContent(false);
  }

  ngOnDestroy() {
    this.UiService.toggleMainContent(true);
  }
}
