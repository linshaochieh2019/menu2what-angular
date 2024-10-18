import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStoreComponent } from './add-store.component';

describe('AddStoreComponent', () => {
  let component: AddStoreComponent;
  let fixture: ComponentFixture<AddStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddStoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
