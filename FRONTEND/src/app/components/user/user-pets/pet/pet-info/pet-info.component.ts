import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PetService } from '../../../../../services/pet.service';
import { Router, RouterLink } from '@angular/router';
import { Pet } from '../../../../../models/pet';

@Component({
  selector: 'app-pet-info',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pet-info.component.html',
  styleUrls: ['./pet-info.component.css'],
})
export class PetInfoComponent implements OnInit {
  pets: Pet[] = [];
  selectedPet: Pet = {
    id: '',
    name: '',
    profilePhoto: '',
    photo: '',
    speciesName: '',
    breedName: '',
    age: 0,
  };

  constructor(private petService: PetService) {}

  ngOnInit() {
    this.loadUserPets();
  }

  loadUserPets() {
    this.petService.getPetsByUser().subscribe(
      (data) => {
        this.pets = data;
        const selectedPetId = localStorage.getItem('selectedPetId');
        if (selectedPetId) {
          this.selectedPet =
            this.pets.find((pet) => pet.id.toString() === selectedPetId) ||
            this.selectedPet;
        }
      },
      (error) => {
        console.error('Error loading user pets:', error);
      }
    );
  }

  selectPet(pet: Pet) {
    console.log('Selected Pet:', pet);
    localStorage.setItem('selectedPetId', pet.id.toString());
    this.selectedPet = pet;
  }
}
