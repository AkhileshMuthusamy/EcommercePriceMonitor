import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from 'src/app/shared/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'mci-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  text = 'SIGNIN';
  loginForm: FormGroup;
  submitted = false;
  hide = true;
  isLoading = false;
  isMessage: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {

    if (this.authService.hasUser()) {
      this.router.navigate(['/dashboard']);
    }
    this.createForm();
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.login(this.loginForm.getRawValue()).subscribe(res => {
        if (!res.error) {
          this.submitted = false;
          this.authService.storeToken(res.data.id);
          this.authService.isLoginSubject.next(true);
          this.router.navigate(['/dashboard']);
        } else {
          this.snackBar.open(res.message || 'Unable to login', 'Close', {duration: 2000});
        }
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
        this.snackBar.open( 'Error while connecting. Please try again.', 'Close', {duration: 2000});
      });
    }
  }

}
