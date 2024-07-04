import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  changePassword() {
    if (this.newPassword !== this.confirmNewPassword) {
      alert('Las nuevas contraseñas no coinciden');
      return;
    }

    this.authService.changePassword(this.currentPassword, this.newPassword).subscribe(response => {
      if (response) {
        alert('Contraseña cambiada correctamente');
        this.router.navigate(['/editInfo']);
      } else {
        alert('La contraseña actual es incorrecta');
      }
    }, error => {
      console.error('Error al cambiar la contraseña:', error);
    });
  }
}