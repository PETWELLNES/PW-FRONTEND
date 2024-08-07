import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User, getDefaultUser } from '../../models/user';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../services/profile.service';
import { ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule, ImageCropperComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  username: string = '';
  activeMenu: string = 'desc';
  user: User = getDefaultUser();
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('bannerFileInput') bannerFileInput!: ElementRef;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.authService.getUsername().subscribe((username) => {
      this.username = username;
      console.log('Username loaded:', this.username);
    });

    this.authService.getUser().subscribe((user) => {
      this.user = user || getDefaultUser();
    });

    if (this.isBrowser()) {
      this.activeMenu = this.getActiveMenuFromUrl(window.location.pathname) || 'desc';
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  setActiveMenu(menu: string) {
    this.activeMenu = menu;
  }

  getActiveMenuFromUrl(url: string): string {
    const currentUrl = url;
    if (currentUrl.includes('posts')) {
      return 'posts';
    } else if (currentUrl.includes('info')) {
      return 'info';
    } else if (currentUrl.includes('user-pets')) {
      return 'user-pets';
    } else if (currentUrl.includes('desc')) {
      return 'desc';
    }
    return 'desc';
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  triggerBannerFileInput() {
    this.bannerFileInput.nativeElement.click();
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

  onBannerFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (file.type.startsWith('image/')) {
        this.uploadBannerImage(file);
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

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', this.user.userId);

    const uploadUrl = 'https://petwellness.onrender.com/api/v1/user/upload-profile-image';

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

  uploadBannerImage(file: File) {
    if (!this.user || !this.user.userId) {
      console.error('User ID is not available');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', this.user.userId);

    const uploadUrl = 'https://petwellness.onrender.com/api/v1/user/upload-banner-image';

    this.profileService.uploadFile(uploadUrl, formData).subscribe(
      (response: any) => {
        if (response && response.imageUrl) {
          if (this.user) {
            this.user.bannerUrl = response.imageUrl;
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
