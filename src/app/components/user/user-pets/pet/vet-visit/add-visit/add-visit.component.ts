import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { VisitService } from '../../../../../../services/visit.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-visit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-visit.component.html',
  styleUrl: './add-visit.component.css',
})
export class AddVisitComponent implements OnInit {
  visitForm: FormGroup;
  petId: number = 0;

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
    if (this.petId <= 0) {
      console.error('No valid petId found');
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    if (this.visitForm.valid) {
      const visitData = this.visitForm.value;
      this.visitService.createVisit(this.petId, visitData).subscribe(
        (response) => {
          this.router.navigate([`/mascota/${this.petId}/vet-visit`]);
        },
        (error) => {
          console.error('Error creating visit:', error);
        }
      );
    }
  }
}
