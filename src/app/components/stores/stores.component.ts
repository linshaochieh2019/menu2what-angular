import { Component } from '@angular/core';
import { StoreService } from '../../services/store/store.service';
import { Store } from '../../models/store.model';


@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrl: './stores.component.scss'
})
export class StoresComponent {
  stores: Store[] = [];

  constructor(public storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.getAllStores().subscribe((stores: Store[]) => {
      this.stores = stores;
    });
  }

}
