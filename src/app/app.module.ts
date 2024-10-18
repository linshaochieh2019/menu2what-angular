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
import { AddStoreComponent } from './components/stores/addStore/add-store/add-store.component';

// Firestore configuration
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';

// Define your routes here
const routes: Routes = [
  { path: '', component: OrderingInterfaceComponent },       // Route for OrderBoardComponent
  { path: 'order', component: OrderComponent },
  { path: 'addStore', component: AddStoreComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    OrderingInterfaceComponent,
    ItemComponent,
    OrderComponent,
    AddStoreComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),  // Import RouterModule and configure routes
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
