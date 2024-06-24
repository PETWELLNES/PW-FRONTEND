import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
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
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getUsername().subscribe(username => {
      this.username = username;
      this.isLoggedIn = !!username;
    });
  }

  login() {
    this.authService.login(this.username, this.password).subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        localStorage.setItem('username', this.username);
        this.cdr.detectChanges();
        console.log('Usuario conectado');
      } else {
        console.log('Credenciales incorrectas');
      }
    });
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    localStorage.removeItem('username');
    this.cdr.detectChanges();
    console.log('Usuario desconectado');
    this.router.navigate(['']);
  }
}
