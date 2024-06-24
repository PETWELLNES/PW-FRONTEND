import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  name: string = '';
  lastname: string = '';
  email: string = '';
  phonenumber: string = '';
  work: string = '';
  birthday: string = '';
  country: string = '';
  registerdate: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const userId = parseInt(localStorage.getItem('userId') || '0', 10);
    if (userId === 0) {
      console.error('No valid userId found in localStorage');
      return;
    }

    this.authService.getUserDetails(userId).subscribe(
      user => {
        this.name = user.name;
        this.lastname = user.lastname;
        this.email = user.email;
        this.phonenumber = user.phone;
        this.work = user.work;
        this.birthday = new Date(user.birthday).toISOString().split('T')[0];
        this.country = user.country;
        this.registerdate = new Date(user.registerday).toLocaleDateString();
      },
      error => {
        console.error('Error fetching user details', error);
      }
    );
  }
}
