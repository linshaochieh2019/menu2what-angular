import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup = this.fb.group({  // Initialize here
    store: ['', Validators.required],
    orderDeadline: ['', Validators.required],
    deliverTime: ['', Validators.required],
    whoPays: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // You could still modify the form if needed here, e.g., set default values
  }

  createOrder(): void {
    if (this.orderForm.valid) {
      console.log('Order created:', this.orderForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  onSubmit() {
    console.log('Form submitted:', this.orderForm.value);
  }
}