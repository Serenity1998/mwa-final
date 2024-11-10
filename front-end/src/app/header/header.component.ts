import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  loginForm!: FormGroup;
  token!: string | null;

  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
    this.token = localStorage.getItem('token')
  }

  submitAction() {
    this._authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe((res) => {
      localStorage.setItem('token', res.token)
      window.location.reload()
    })
  }

  logoutAction() {
    localStorage.removeItem('token');
    window.location.reload()
  }
}
