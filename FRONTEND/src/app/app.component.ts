import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { UiService } from './services/ui.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ForoComponent } from './components/foro/foro.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RegisterComponent } from './components/auth/register/register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    LoginComponent,
    FooterComponent,
    RegisterComponent,
    ForoComponent,
    RouterLink,
    MatDialogModule,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'PetWellnes';

  showMainContent = true;
  showLoginModal = false;

  constructor(private uiService: UiService, private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const url = (event as NavigationEnd).url;
        this.showMainContent = url === '/' || url === '';
      });

    this.uiService.showMainContent$.subscribe((show) => {
      this.showMainContent = show;
    });
  }
}
