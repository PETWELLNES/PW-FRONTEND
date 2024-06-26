import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  username: string = '';
  activeMenu: string = '';
  user: User | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.authService.getUsername().subscribe((username) => {
      this.username = username;
      console.log('Username loaded:', this.username);
    });

    this.authService.getUser().subscribe((user) => {
      this.user = user;
      console.log('User loaded:', this.user);
    });

    this.activeMenu = this.getActiveMenuFromUrl();
  }

  setActiveMenu(menu: string) {
    this.activeMenu = menu;
  }

  getActiveMenuFromUrl(): string {
    const currentUrl = window.location.pathname;
    if (currentUrl.includes('posts')) {
      return 'posts';
    } else if (currentUrl.includes('info')) {
      return 'info';
    }
    return '';
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (file.type.startsWith('image/')) {
        this.uploadProfileImage(file);
      } else {
        alert('Please select an image file.');
      }
    }
  }

  uploadProfileImage(file: File) {
    if (!this.user || !this.user.userId) {
      console.error('User ID is not available');
      return;
    }

    console.log('User ID:', this.user.userId);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', this.user.userId.toString());

    const uploadUrl = 'http://localhost:8080/api/v1/user/upload-profile-image';

    this.profileService.uploadFile(uploadUrl, formData).subscribe(
      (response: any) => {
        if (response && response.imageUrl) {
          if (this.user) {
            this.user.profileImageUrl = response.imageUrl;
          }
        }
      },
      (error) => {
        console.error('Error uploading file', error);
        if (error.status === 413) {
          alert(
            'The file is too large to upload. Please select a smaller file.'
          );
        }
      }
    );
  }
}
