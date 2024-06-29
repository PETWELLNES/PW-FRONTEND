import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css'],
})
export class ForgotComponent {
  email: string = '';

  constructor(private authService: AuthService) {}

  sendResetEmail() {
    this.authService.sendPasswordResetEmail(this.email).subscribe(
      (response) => {
        alert('Se ha enviado un correo para restablecer tu contraseña.');
      },
      (error) => {
        console.error(
          'Error al enviar el correo de restablecimiento de contraseña:',
          error
        );
        alert('Error al enviar el correo de restablecimiento de contraseña.');
      }
    );
  }
}
