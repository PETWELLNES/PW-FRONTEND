import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterOutlet, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';
  isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  login() {
    this.authService.login(this.username, this.password).subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.cdr.detectChanges();
      if (isLoggedIn) {
        console.log('Usuario conectado');
      } else {
        console.log('Credenciales incorrectas');
      }
    });
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.cdr.detectChanges();
    console.log('Usuario desconectado');
  }
}