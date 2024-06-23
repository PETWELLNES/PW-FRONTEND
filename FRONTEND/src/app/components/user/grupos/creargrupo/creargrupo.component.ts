import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-creargrupo',
  standalone: true,
  imports: [ FormsModule, RouterLink, CommonModule ],
  templateUrl: './creargrupo.component.html',
  styleUrl: './creargrupo.component.css'
})
export class CreargrupoComponent {
  post = {
    eslogan: '',
    name: '',
    title: '',
    content: ''
  };

  constructor() {}

  submitForm() {
    console.log('Formulario enviado:', this.post);
  }
}
