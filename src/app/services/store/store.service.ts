import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Store } from '../../models/store.model';
import { Observable, from, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private storesCollection: AngularFirestoreCollection<Store>;
  stores: Observable<Store[]>; // Make this public

  constructor(private firestore: AngularFirestore) {
    this.storesCollection = this.firestore.collection('stores');
    this.stores = this.storesCollection.valueChanges(); 
  }

  // Function to save store to Firestore
  saveStore(storeObject: any) {
    return this.firestore
      .collection('stores')
      .doc(storeObject.storeId)
      .set(storeObject)
      .then(() => {
        console.log('Store successfully saved!');
      })
      .catch((error) => {
        console.error('Error saving store: ', error);
      });
  }

  // Function to get store by ID
  getStoreById(storeId: string): Observable<Store | undefined> {
    return from(
      this.firestore.collection('stores').doc(storeId).get()
    ).pipe(
      map(doc => doc.exists ? doc.data() as Store : undefined)
    );
  }

  // Function to get all stores 
  getAllStores(): Observable<Store[]> {
    return this.stores;
  }

  // Function to get all stores' id and name
  getAllStoresIdAndName(): Observable<any[]> {
    return this.stores.pipe(
      map(stores => stores.map(store => ({ id: store.storeId, name: store.storeName })))
    );
  }
}
