import { Component } from '@angular/core';
import { DropdownMenuComponent } from '../dropdown-menu/dropdown-menu.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-perros',
  standalone: true,
  imports: [ DropdownMenuComponent, RouterLink, RouterOutlet],
  templateUrl: './perros.component.html',
  styleUrl: '../categoriasm.component.css'
})
export class PerrosComponent {

}
