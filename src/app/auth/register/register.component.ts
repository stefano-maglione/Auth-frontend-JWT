import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { NotificationService } from '../../notification.service';
import { CommonModule } from '@angular/common';
import { PasswordStrengthComponent } from '../../shared/password-strength/password-strength.component';
import { ThemeSwitcherComponent } from '../../shared/theme-switcher/theme-switcher.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    PasswordStrengthComponent,
    ThemeSwitcherComponent,
  ],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private notificationService: NotificationService,
  ) {
    this.registerForm = this.fb.group(
      {
        firstName: [
          '',
          [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)],
        ], // Only allow letters
        lastName: [
          '',
          [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator },
    ); // Custom validator added
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  sanitizeInput(value: string): string {
    return this.sanitizer.sanitize(1, value) || ''; // Sanitizes untrusted data
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const formData = {
        firstName: this.sanitizeInput(this.registerForm.value.firstName),
        lastName: this.sanitizeInput(this.registerForm.value.lastName),
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      };

      this.authService
        .register(formData)
        .pipe(
          tap(() => {
            this.notificationService.setMessage(
              'Registration successful! Please login.',
            );
            this.router.navigate(['/login']);
          }),
          catchError((error) => {
            console.error('Registration error', error);
            if (error.status === 409) {
              this.errorMessage = error.error.message;
            } else {
              this.errorMessage = 'Registration failed. Please try again.';
            }
            return EMPTY;
          }),
        )
        .subscribe();
    }
  }
}
