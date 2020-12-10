import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../../../shared/services/auth.service';
import {MustMatch} from '../../../shared/validators/password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService) {
    if (this.authService.hasUser()) {
      this.router.navigate(['/dashboard']);
    }
    this.createForm();
  }

  ngOnInit(): void {
  }

  get f() {
    return this.registerForm.controls;
  }

  createForm(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  submit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.getRawValue()).subscribe(res => {
        if (!res.error) {
          this.submitted = false;
          this.router.navigate(['/login']);
          this.snackBar.open(res.message || 'Registered successfully', 'Close', {duration: 2000});
        } else {
          this.snackBar.open(res.message || 'Unable to create user', 'Close', {duration: 2000});
        }
      });
    }
  }

}
