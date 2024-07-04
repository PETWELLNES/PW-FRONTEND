import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetPhotosComponent } from './pet-photos.component';

describe('PetPhotosComponent', () => {
  let component: PetPhotosComponent;
  let fixture: ComponentFixture<PetPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetPhotosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PetPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
