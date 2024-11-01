import { Component, OnInit } from '@angular/core';
import { Store } from '../../../../models/store.model';
import { StoreService } from '../../../../services/store/store.service';
import { ActivatedRoute } from '@angular/router';
import { Input } from '@angular/core';

@Component({
  selector: 'app-ordering-interface',
  templateUrl: './ordering-interface.component.html',
  styleUrl: './ordering-interface.component.scss',
})
export class OrderingInterfaceComponent implements OnInit {
  @Input() storeId: string | null = '';
  store: Store | undefined;
  
  constructor(
    private storeService: StoreService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.storeId) {
      this.storeService.getStoreById(this.storeId).subscribe((store) => {
        this.store = store;
      });
    }
  }
}
