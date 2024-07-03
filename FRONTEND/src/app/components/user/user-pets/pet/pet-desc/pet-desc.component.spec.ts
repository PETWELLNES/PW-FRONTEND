import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetDescComponent } from './pet-desc.component';

describe('PetDescComponent', () => {
  let component: PetDescComponent;
  let fixture: ComponentFixture<PetDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetDescComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PetDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
