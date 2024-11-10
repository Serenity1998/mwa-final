import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  token!: string | null;

  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
    this.token = localStorage.getItem('token')
  }

  submitAction() {
    this._authService.register(this.registerForm.value.username, this.registerForm.value.password).subscribe((res) => {
      localStorage.setItem('token', res.token)
      this._router.navigate(['/']).finally(() => window.location.reload())
    })
  }

}
