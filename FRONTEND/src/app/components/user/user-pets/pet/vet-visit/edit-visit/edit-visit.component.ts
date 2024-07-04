import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VisitService } from '../../../../../../services/visit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VetVisit } from '../../../../../../models/vet-visit';

@Component({
  selector: 'app-edit-visit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-visit.component.html',
  styleUrl: './edit-visit.component.css',
})
export class EditVisitComponent implements OnInit {
  visitForm: FormGroup;
  petId: number = 0;
  visitId: number = 0;

  constructor(
    private fb: FormBuilder,
    private visitService: VisitService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.visitForm = this.fb.group({
      date: ['', Validators.required],
      reason: ['', Validators.required],
      notes: [''],
    });
  }

  ngOnInit() {
    this.petId = parseInt(this.route.snapshot.paramMap.get('petId') || '0', 10);
    this.visitId = parseInt(
      this.route.snapshot.paramMap.get('visitId') || '0',
      10
    );
    if (this.petId > 0 && this.visitId > 0) {
      this.loadVisitDetails();
    } else {
      console.error('No valid petId or visitId found');
    }
  }

  loadVisitDetails() {
    this.visitService.getVisitById(this.petId, this.visitId).subscribe(
      (visit) => {
        this.visitForm.patchValue({
          date: visit.date,
          reason: visit.reason,
          notes: visit.notes,
        });
      },
      (error) => {
        console.error('Error fetching visit details', error);
      }
    );
  }

  onSubmit() {
    if (this.visitForm.valid) {
      const visitData: VetVisit = {
        ...this.visitForm.value,
        id: this.visitId,
        petId: this.petId,
      };
      this.visitService.updateVisit(visitData).subscribe(
        () => {
          this.router.navigate([`/mascota/${this.petId}/vet-visit`]);
        },
        (error) => {
          console.error('Error updating visit', error);
        }
      );
    }
  }
}
