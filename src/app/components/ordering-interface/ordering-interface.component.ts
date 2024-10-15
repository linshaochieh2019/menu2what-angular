import { Component, OnInit } from '@angular/core';
import { Store, dummyStores } from '../../models/store.model';

@Component({
  selector: 'app-ordering-interface',
  templateUrl: './ordering-interface.component.html',
  styleUrl: './ordering-interface.component.scss'
})
export class OrderingInterfaceComponent implements OnInit {

  store: Store = dummyStores[0];

  ngOnInit() {
    // Initialize the ordering interface
    console.log(this.store)
  }

  
}
