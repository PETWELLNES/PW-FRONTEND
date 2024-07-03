import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Pet } from '../../../../models/pet';
import { AuthService } from '../../../../services/auth.service';
import { PetService } from '../../../../services/pet.service';
import { ProfileService } from '../../../../services/profile.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-pet',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css'],
})
export class PetComponent implements OnInit {
  activeMenu: string = 'pet-desc';
  selectedPet: Pet = {
    id: '',
    name: '',
    profilePhoto: '',
    photo: '',
    speciesName: '',
    breedName: '',
    age: 0,
  };
  pets: Pet[] = [];
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private authService: AuthService,
    private petService: PetService,
    private profileService: ProfileService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadUserPets();
    this.route.paramMap.subscribe((params) => {
      const petId = params.get('id');
      if (petId) {
        this.loadSelectedPet(petId);
      }
    });
    if (this.isBrowser()) {
      this.activeMenu =
        this.getActiveMenuFromUrl(window.location.pathname) || 'pet-desc';
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  loadUserPets() {
    this.petService.getPetsByUser().subscribe(
      (data) => {
        this.pets = data;
        console.log('Pets loaded:', this.pets);
      },
      (error) => {
        console.error('Error loading user pets:', error);
      }
    );
  }

  loadSelectedPet(petId: string) {
    this.petService.getPetDetails(parseInt(petId, 10)).subscribe(
      (pet) => {
        this.selectedPet = pet;
        console.log('Selected Pet:', this.selectedPet);
      },
      (error) => {
        console.error('Error fetching pet details', error);
      }
    );
  }

  setActiveMenu(menu: string) {
    this.activeMenu = menu;
  }

  getActiveMenuFromUrl(url: string): string {
    const currentUrl = url;
    if (currentUrl.includes('pet-photos')) {
      return 'pet-photos';
    } else if (currentUrl.includes('vet-visit')) {
      return 'vet-visit';
    } else if (currentUrl.includes('pet-info')) {
      return 'pet-info';
    } else if (currentUrl.includes('pet-desc')) {
      return 'pet-desc';
    }
    return 'pet-desc';
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
    if (!this.selectedPet || !this.selectedPet.id) {
      console.error('Pet ID is not available');
      return;
    }

    console.log('Pet ID:', this.selectedPet.id);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('petId', this.selectedPet.id.toString());

    const uploadUrl = 'http://localhost:8080/api/v1/pets/upload-profile-image';

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    this.profileService.uploadFile(uploadUrl, formData, headers).subscribe(
      (response: any) => {
        if (response) {
          if (this.selectedPet) {
            this.selectedPet.profilePhoto = response;
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
