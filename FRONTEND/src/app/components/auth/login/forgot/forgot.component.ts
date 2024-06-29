import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.css'
})
export class ForgotComponent {
  email: string = '';

  constructor(private authService: AuthService) {}

  onRecoverPassword() {
    this.authService.recoverPassword(this.email).subscribe(success => {
      if (success) {
        alert('Correo de recuperación enviado.');
      } else {
        alert('Error al enviar el correo de recuperación.');
      }
    });
  }
}