import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../services/store/store.service';
import { Store } from '../../../models/store.model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})
export class StoreComponent implements OnInit {
  store: Store | undefined;

  constructor(
    public storeService: StoreService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const storeId = this.route.snapshot.paramMap.get('id');
    
    if (storeId) {
      this.storeService.getStoreById(storeId).subscribe((store) => {
        this.store = store;
      });
    }
  }

  startOrder() {
    if (this.store && this.store.storeId) {
      // Navigate to add-order with the storeId
      this.router.navigate(['/add-order'], { 
        queryParams: { storeId: this.store.storeId } 
      });
    } else {
      // Handle the case where store or storeId is not available
      console.error('Store ID not found.');
      // You might want to display an error message to the user or handle it differently
    }
  }
}
