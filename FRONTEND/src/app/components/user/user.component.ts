import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  username: string = '';
  activeMenu: string = '';

  ngOnInit() {
    this.username = localStorage.getItem('username') || '';
    this.activeMenu = this.getActiveMenuFromUrl();
  }

  setActiveMenu(menu: string) {
    this.activeMenu = menu;
  }

  getActiveMenuFromUrl(): string {
    const currentUrl = window.location.pathname;
    if (currentUrl.includes('posts')) {
      return 'posts';
    } else if (currentUrl.includes('info')) {
      return 'info';
    }
    return '';
  }
}