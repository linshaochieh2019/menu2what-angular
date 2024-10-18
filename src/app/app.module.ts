// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // To support ngModel for form binding

// Custom components
import { MenuComponent } from './components/orders/order/menu/menu.component';
import { ItemComponent } from './components/orders/order/item/item.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AddOrderComponent } from './components/orders/add-order/add-order.component';
import { OrderComponent } from './components/orders/order/order.component';
import { AddStoreComponent } from './components/stores/add-store/add-store.component';
import { StoresComponent } from './components/stores/stores.component';
import { StoreComponent } from './components/stores/store/store.component';

// Firestore configuration
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';

// Define your routes here
const routes: Routes = [
  { path: '', component: StoresComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'order/:orderId', component: OrderComponent },
  { path: 'add-order', component: AddOrderComponent },
  { path: 'stores', component: StoresComponent },
  { path: 'store/:id', component: StoreComponent },
  { path: 'add-store', component: AddStoreComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ItemComponent,
    AddStoreComponent,
    OrdersComponent,
    AddOrderComponent,
    OrderComponent,
    StoresComponent,
    StoreComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),  // Import RouterModule and configure routes
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
