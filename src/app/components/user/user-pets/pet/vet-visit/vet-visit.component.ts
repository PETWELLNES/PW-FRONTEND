import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { VisitService } from '../../../../../services/visit.service';
import { VetVisit } from '../../../../../models/vet-visit';

@Component({
  selector: 'app-vet-visit',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './vet-visit.component.html',
  styleUrl: './vet-visit.component.css',
})
export class VetVisitComponent implements OnInit {
  visits: VetVisit[] = [];
  petId: number = 0;

  constructor(
    private visitService: VisitService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.parent?.paramMap.subscribe((params) => {
      this.petId = parseInt(params.get('id') || '0', 10);
      if (this.petId > 0) {
        this.loadVisits();
      } else {
        console.error('No valid petId found');
      }
    });
  }

  loadVisits() {
    this.visitService.getVisitsByPetId(this.petId).subscribe(
      (data) => {
        this.visits = data;
      },
      (error) => {
        console.error('Error loading visits:', error);
      }
    );
  }

  navigateToAddVisit() {
    this.router.navigate([`/añadir-visita/${this.petId}`]);
  }

  navigateToEditVisit(visitId: number) {
    this.router.navigate([`/editar-visita/${this.petId}/${visitId}`]);
  }

  deleteVisit(visitId: number) {
    this.visitService.deleteVisit(visitId).subscribe(
      () => {
        this.loadVisits(); // Reload the visits after deletion
      },
      (error) => {
        console.error('Error deleting visit:', error);
      }
    );
  }
}
