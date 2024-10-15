import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderingInterfaceComponent } from './ordering-interface.component';

describe('OrderingInterfaceComponent', () => {
  let component: OrderingInterfaceComponent;
  let fixture: ComponentFixture<OrderingInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderingInterfaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderingInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
