import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DropdownMenuComponent } from '../dropdown-menu/dropdown-menu.component';

@Component({
  selector: 'app-peces',
  standalone: true,
  imports: [ RouterLink, RouterOutlet, DropdownMenuComponent],
  templateUrl: './peces.component.html',
  styleUrl: '../categoriasm.component.css'
})
export class PecesComponent {

}
