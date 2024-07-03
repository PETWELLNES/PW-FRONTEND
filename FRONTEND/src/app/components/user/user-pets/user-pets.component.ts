import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-pets',
  standalone: true,
  imports: [ RouterLink],
  templateUrl: './user-pets.component.html',
  styleUrl: './user-pets.component.css'
})
export class UserPetsComponent {

}
