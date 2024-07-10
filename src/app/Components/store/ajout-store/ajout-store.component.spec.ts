import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutStoreComponent } from './ajout-store.component';

describe('AjoutStoreComponent', () => {
  let component: AjoutStoreComponent;
  let fixture: ComponentFixture<AjoutStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjoutStoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
