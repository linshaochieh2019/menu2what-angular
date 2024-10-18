import { Component, OnInit } from '@angular/core';
import { Store } from '../../models/store.model';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-ordering-interface',
  templateUrl: './ordering-interface.component.html',
  styleUrl: './ordering-interface.component.scss',
})
export class OrderingInterfaceComponent implements OnInit {
  selectedStore: Store | undefined;
  storeId = '3';
  constructor(private storeService: StoreService) {}

  ngOnInit() {
    this.storeService.getStoreById(this.storeId).subscribe(store => {
      this.selectedStore = store;
    });
  }
}
