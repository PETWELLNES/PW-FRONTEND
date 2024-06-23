import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginPopupComponent } from '../login/login-popup/login-popup.component';

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    imports: [RouterLink, RouterOutlet, LoginPopupComponent, CommonModule]
})
export class NavbarComponent {
  isLoginPopupVisible = false;

  toggleLoginPopup(): void {
    this.isLoginPopupVisible = !this.isLoginPopupVisible;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (this.isLoginPopupVisible && !target.closest('.login-popup') && !target.closest('.fa-circle-user')) {
      this.isLoginPopupVisible = false;
    }
  }
}
