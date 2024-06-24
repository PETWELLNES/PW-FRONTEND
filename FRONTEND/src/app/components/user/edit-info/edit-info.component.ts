import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/user';
import { CountryService } from '../../../services/country.service';

@Component({
  selector: 'app-edit-info',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.css']
})
export class EditInfoComponent implements OnInit {
  editForm: FormGroup;
  userId: number = 0;
  countries: string[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private countryService: CountryService,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      work: [''],
      birthday: [''],
      country: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.userId = parseInt(localStorage.getItem('userId') || '0', 10);
    if (this.userId === 0) {
      console.error('No valid userId found in localStorage');
      this.router.navigate(['']);
      return;
    }

    this.authService.getUserDetails(this.userId).subscribe(
      user => {
        this.editForm.patchValue({
          username: user.username,
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          phone: user.phone,
          work: user.work,
          birthday: user.birthday,
          country: user.country
        });
      },
      error => {
        console.error('Error fetching user details', error);
      }
    );

    this.countryService.getCountries().subscribe(
      countries => {
        this.countries = countries;
      },
      error => {
        console.error('Error fetching countries', error);
      }
    );
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedUser: User = {
        ...this.editForm.value,
        registerday: ''
      };

      this.authService.updateUserDetails(this.userId, updatedUser).subscribe(
        response => {
          console.log('User updated successfully', response);
          this.router.navigate(['/perfil/info']);
        },
        error => {
          console.error('Error updating user', error);
        }
      );
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.editForm.get(controlName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
}
