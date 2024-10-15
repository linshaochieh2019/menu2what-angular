// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; // To support ngModel for form binding

// Custom components
import { OrderingInterfaceComponent } from './components/ordering-interface/ordering-interface.component';
import { ItemComponent } from './components/item/item.component';
import { OrderComponent } from './components/order/order.component';

// Define your routes here
const routes: Routes = [
  { path: 'ordering-interface', component: OrderingInterfaceComponent },       // Route for OrderBoardComponent
  { path: 'order', component: OrderComponent }  
];

@NgModule({
  declarations: [
    AppComponent,
    OrderingInterfaceComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),  // Import RouterModule and configure routes
    ReactiveFormsModule                    // Import FormsModule for two-way binding
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
