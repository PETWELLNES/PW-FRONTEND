import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [ FormsModule, RouterLink, CommonModule ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  animalTypes = ['Perros', 'Gatos', 'Peces', 'Roedores', 'Reptiles', 'Otros'];
  breeds = ['Raza 1', 'Raza 2', 'Raza 3', 'Raza 4', 'Raza 5'];
  categories = ['General', 'Comportamiento', 'Alimentación', 'Salud', 'Moda'];

  post = {
    animalType: '',
    breed: '',
    category: '',
    title: '',
    content: ''
  };

  constructor() {}

  submitForm() {
    console.log('Formulario enviado:', this.post);
  }
}