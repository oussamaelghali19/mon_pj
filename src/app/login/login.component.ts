import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  myForm: FormGroup;

  constructor(private router: Router, private http: HttpClient) {
    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    const email = this.myForm.get('email')?.value;
    const password = this.myForm.get('password')?.value;

    // check login
    this.http.post(`${environment.api}/login`, { email, password }).subscribe({
      next: (data) => this.router.navigate(['/movies']),
      error: (error) =>
        alert(`Error login for: ${this.myForm.get('email')?.value}`),
    });
  }
}
