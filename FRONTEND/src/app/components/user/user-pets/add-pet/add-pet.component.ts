import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PetService } from '../../../../services/pet.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-pet',
  standalone: true,
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class AddPetComponent implements OnInit {
  petForm: FormGroup;
  speciesList: any[] = [];
  breedsList: any[] = [];
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private petService: PetService,
    private router: Router
  ) {
    this.petForm = this.fb.group({
      name: ['', Validators.required],
      species: ['', Validators.required],
      breed: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      profilePhoto: [''],
    });
  }

  ngOnInit() {
    this.loadAnimalTypes();
    this.petForm.get('species')?.valueChanges.subscribe((speciesId) => {
      console.log('Species ID:', speciesId); // Añade este log para depurar
      this.loadBreeds(speciesId);
    });
  }

  loadAnimalTypes() {
    this.petService.getAnimalTypes().subscribe(
      (data) => {
        console.log('Animal types loaded:', data);
        this.speciesList = data;
      },
      (error) => {
        console.error('Error loading animal types:', error);
      }
    );
  }

  loadBreeds(typeId: number) {
    if (typeId) {
      this.petService.getBreedsByType(typeId).subscribe(
        (data) => {
          this.breedsList = data;
        },
        (error) => {
          console.error('Error loading breeds:', error);
        }
      );
    } else {
      console.error('Invalid typeId:', typeId); // Añade este log para depurar
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    if (this.petForm.valid) {
      const formData = new FormData();
      formData.append('pet', JSON.stringify(this.petForm.value));
      if (this.selectedFile) {
        formData.append('profilePhoto', this.selectedFile);
      }
      this.submitForm(formData);
    }
  }

  submitForm(formData: FormData) {
    this.petService.createPet(formData).subscribe(
      (response) => {
        this.router.navigate(['/perfil/user-pets']);
      },
      (error) => {
        console.error('Error al agregar mascota:', error);
      }
    );
  }
}
