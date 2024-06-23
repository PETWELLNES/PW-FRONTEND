import { Component } from '@angular/core';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {

  phonenumber = '953117285';
  work = 'Estudiante';
  birthday = '20/12/2003';
  registerdate = '10/06/2024';
  country = 'Perú';
}
