import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-grupos',
  standalone: true,
  imports: [ FormsModule, RouterLink, CommonModule ],
  templateUrl: './grupos.component.html',
  styleUrl: './grupos.component.css'
})
export class GruposComponent {
  grupos = [
    { nombre: 'Perrotes', miembros: 7, imagen: '../../../../assets/perrotes.jpg' },
    { nombre: 'Amigos peludos', miembros: 3, imagen: '../../../../assets/mascotas.png' },
    { nombre: 'Gatitos', miembros: 3, imagen: '../../../../assets/gatitos.webp' },
    { nombre: 'Superpets', miembros: 2, imagen: '../../../../assets/pets.jpg' },
  ];

  constructor() {}
}