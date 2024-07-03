import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PetService } from '../../../../../../services/pet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-pet-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-pet-info.component.html',
  styleUrls: ['./edit-pet-info.component.css'],
})
export class EditPetInfoComponent implements OnInit {
  petForm: FormGroup;
  speciesList: any[] = [];
  breedsList: any[] = [];
  selectedFile: File | null = null;
  petId: number = 0;

  constructor(
    private fb: FormBuilder,
    private petService: PetService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.petForm = this.fb.group({
      name: ['', Validators.required],
      species: [null, Validators.required],
      breed: [null, Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      profilePhoto: [''],
    });
  }

  ngOnInit() {
    this.petId = parseInt(this.route.snapshot.paramMap.get('id') || '0', 10);
    if (this.petId > 0) {
      this.loadPetDetails();
      this.loadAnimalTypes();
    } else {
      console.error('No valid petId found');
    }

    this.petForm.get('species')?.valueChanges.subscribe((speciesId) => {
      this.loadBreeds(parseInt(speciesId, 10));
    });
  }

  loadPetDetails() {
    this.petService.getPetDetails(this.petId).subscribe(
      (pet) => {
        this.petForm.patchValue({
          name: pet.name,
          species: pet.speciesName,
          breed: pet.breedName,
          age: pet.age,
        });
        this.loadBreeds(parseInt(pet.speciesName, 10));
      },
      (error) => {
        console.error('Error fetching pet details', error);
      }
    );
  }

  loadAnimalTypes() {
    this.petService.getAnimalTypes().subscribe(
      (data) => {
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
      const petFormValue = {
        name: this.petForm.value.name,
        species: this.petForm.value.species,
        breed: this.petForm.value.breed,
        age: this.petForm.value.age,
      };

      const formData = new FormData();
      formData.append(
        'pet',
        new Blob([JSON.stringify(petFormValue)], { type: 'application/json' })
      );
      if (this.selectedFile) {
        formData.append('profilePhoto', this.selectedFile);
      }
      this.submitForm(formData);
    }
  }

  submitForm(formData: FormData) {
    this.petService.updatePet(this.petId, formData).subscribe(
      (response) => {
        this.router.navigate(['/perfil/user-pets']);
      },
      (error) => {
        console.error('Error al editar mascota:', error);
      }
    );
  }
}
