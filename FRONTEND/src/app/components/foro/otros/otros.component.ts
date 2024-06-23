import { DropdownMenuComponent } from './../dropdown-menu/dropdown-menu.component';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-otros',
  standalone: true,
  imports: [ RouterLink, RouterOutlet, DropdownMenuComponent],
  templateUrl: './otros.component.html',
  styleUrl: '../categoriasm.component.css'
})
export class OtrosComponent {

}
