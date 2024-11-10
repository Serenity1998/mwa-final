import { Component } from '@angular/core';
import { OrderItem, OrderNum } from '../../models/order_model';
import { OrderService } from '../order.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  current!: OrderItem | undefined;
  
  constructor(private _orderService: OrderService, private _activatedRoute:ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    const order_id:string= this._activatedRoute.snapshot.params["id"];
    const item_id:string= this._activatedRoute.snapshot.params["itemId"];
    this._orderService.getCurrentItem(order_id).subscribe((data) => {
      this.current = data.find((v) => v._id === item_id)
      console.log(this.current)
    })
  }

  deleteOrderItem() {
    const item_id:string= this._activatedRoute.snapshot.params["itemId"];
    this._orderService.deleteTrip(item_id).subscribe(data => {
      this._router.navigate(['/'])
      
    })
    console.log("Delete");
  }

}
