import { Component } from '@angular/core';
import { StoreService } from '../../../../services/store.service';
import { Store } from '../../../../models/store.model';


@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrl: './add-store.component.scss'
})
export class AddStoreComponent {
  constructor(private storeService: StoreService) {}
  storeObject: Store | undefined;

  // Function to save the store
  saveStore() {
    this.storeService.saveStore(this.storeObject);
  }

}
