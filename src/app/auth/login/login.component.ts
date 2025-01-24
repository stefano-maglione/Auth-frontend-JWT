import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { JwtService } from '../jwt-service.service';
import { NotificationService } from '../../notification.service';
import { ThemeService } from '../../theme.service';
import { CommonModule } from '@angular/common';
import { ThemeSwitcherComponent } from '../../shared/theme-switcher/theme-switcher.component';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    ThemeSwitcherComponent,
  ],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage = '';
  successMessage = '';
  isDarkMode = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private jwtService: JwtService,
    private router: Router,
    private notificationService: NotificationService,
    private themeService: ThemeService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.isDarkMode = this.themeService.getCurrentTheme() === 'dark';
  }

  ngOnInit(): void {
    this.successMessage = this.notificationService.getMessage();
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value)
        .pipe(
          tap((response) => {
            console.log(response);
            const authHeader = response.headers.get('Authorization');
            if (authHeader && authHeader.startsWith('Bearer ')) {
              const token = authHeader.split(' ')[1];
              this.jwtService.storeToken(token);
              this.router.navigate(['/dashboard']);
            }
          }),
          catchError((error) => {
            console.error('Login Failed:', error);
            if (error.status === 401 && error.error) {
              this.errorMessage =
                error.error.error || 'Invalid email or password.';
              console.error('Error Details:', error.error);
            } else {
              this.errorMessage =
                'An unexpected error occurred. Please try again later.';
            }

            return of(null);
          }),
        )
        .subscribe();
    }
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.isDarkMode = this.themeService.getCurrentTheme() === 'dark';
  }
}
