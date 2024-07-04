import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-change-password-popup',
  standalone: true,
  imports: [ConfirmationComponent, RouterOutlet, RouterLink],
  templateUrl: './change-password-popup.component.html',
  styleUrl: './change-password-popup.component.css',
})
export class ChangePasswordPopupComponent {}
