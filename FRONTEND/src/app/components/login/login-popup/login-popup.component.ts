import { Component } from '@angular/core';
import { LoginComponent } from '../login.component';

@Component({
  selector: 'app-login-popup',
  standalone: true,
  imports: [ LoginComponent],
  templateUrl: './login-popup.component.html',
  styleUrl: './login-popup.component.css'
})
export class LoginPopupComponent {

}
