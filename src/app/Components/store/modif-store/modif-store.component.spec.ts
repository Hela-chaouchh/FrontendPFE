import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifStoreComponent } from './modif-store.component';

describe('ModifStoreComponent', () => {
  let component: ModifStoreComponent;
  let fixture: ComponentFixture<ModifStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifStoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
