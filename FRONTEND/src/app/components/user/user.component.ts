import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUsername().subscribe(username => {
      this.username = username;
    });
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