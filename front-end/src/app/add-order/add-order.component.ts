import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../order.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-order',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.css',
})
export class AddOrderComponent implements OnInit {
  registrationForm!: FormGroup;
  token!: string | null;
  constructor(private _orderService: OrderService, private _router: Router) {}
  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      name: new FormControl(),
      price: new FormControl(),
      priority: new FormControl(),
      color: new FormControl(),
      description: new FormControl(),
      link: new FormControl(),
    });
    this.token = localStorage.getItem('token')
  }
  submitAction = () => {
    const formValues = {
      data: this.registrationForm.value,
    };
    this._orderService.addItem(formValues).subscribe((data) => {
      console.log(data);
      this._router.navigate(['/'])
    });
  };
}
