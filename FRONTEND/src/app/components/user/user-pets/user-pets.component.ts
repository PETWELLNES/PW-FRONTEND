import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PetService } from '../../../services/pet.service';
import { CommonModule } from '@angular/common';
import { Pet } from '../../../models/pet';

@Component({
  selector: 'app-user-pets',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './user-pets.component.html',
  styleUrls: ['./user-pets.component.css'],
})
export class UserPetsComponent implements OnInit {
  pets: Pet[] = [];

  constructor(private petService: PetService) {}

  ngOnInit() {
    this.loadUserPets();
  }

  loadUserPets() {
    this.petService.getPetsByUser().subscribe(
      (data) => {
        this.pets = data;
      },
      (error) => {
        console.error('Error loading user pets:', error);
      }
    );
  }

  selectPet(pet: Pet) {
    console.log('Selected Pet:', pet);
    localStorage.setItem('selectedPetId', pet.id.toString());
  }
}
