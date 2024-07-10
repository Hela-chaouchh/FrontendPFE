import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeSComponent } from './liste-s.component';

describe('ListeSComponent', () => {
  let component: ListeSComponent;
  let fixture: ComponentFixture<ListeSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeSComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
