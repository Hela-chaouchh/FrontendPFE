import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarAccueilComponent } from './nav-bar-accueil.component';

describe('NavBarAccueilComponent', () => {
  let component: NavBarAccueilComponent;
  let fixture: ComponentFixture<NavBarAccueilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavBarAccueilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavBarAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
