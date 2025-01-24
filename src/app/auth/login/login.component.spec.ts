import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { JwtService } from '../jwt-service.service';
import { NotificationService } from '../../notification.service';
import { Router, Routes, provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../../dashboard/dashboard.component';

const testRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
];

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let jwtService: jasmine.SpyObj<JwtService>;
  let router: Router;
  let notificationService: jasmine.SpyObj<NotificationService>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['login']);
    jwtService = jasmine.createSpyObj('JwtService', ['storeToken']);
    notificationService = jasmine.createSpyObj('NotificationService', [
      'getMessage',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule,
        HttpClientTestingModule,
        CommonModule,
      ],
      providers: [
        provideRouter(testRoutes),
        { provide: AuthService, useValue: authService },
        { provide: JwtService, useValue: jwtService },
        { provide: NotificationService, useValue: notificationService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router); // Injecting the router instead of manual spy creation
    spyOn(router, 'navigate'); // Spying on router's navigate method
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.loginForm.value).toEqual({ email: '', password: '' });
  });

  it('should validate email as required', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('');
    expect(emailControl?.valid).toBeFalsy();
    expect(emailControl?.errors?.['required']).toBeTruthy();
  });

  it('should validate email format', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBeFalsy();
    expect(emailControl?.errors?.['email']).toBeTruthy();
  });

  it('should validate password as required', () => {
    const passwordControl = component.loginForm.get('password');
    passwordControl?.setValue('');
    expect(passwordControl?.valid).toBeFalsy();
    expect(passwordControl?.errors?.['required']).toBeTruthy();
  });

  it('should validate password minimum length', () => {
    component.loginForm.controls['password'].setValue('123');
    fixture.detectChanges();
    expect(component.loginForm.controls['password'].valid).toBeFalse();
  });

  it('should login successfully and store token', fakeAsync(() => {
    authService.login.and.returnValue(
      of(
        new HttpResponse({
          status: 200,
          headers: new HttpHeaders({ Authorization: 'Bearer mock-token' }),
          body: undefined,
        }),
      ),
    );

    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'password123',
    });
    component.onLogin();
    tick();

    expect(jwtService.storeToken).toHaveBeenCalledWith('mock-token');
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  }));

  it('should show error message on failed login (401)', fakeAsync(() => {
    const mockErrorResponse = {
      status: 401,
      error: { error: 'Invalid email or password' },
    };
    authService.login.and.returnValue(throwError(() => mockErrorResponse));

    component.loginForm.setValue({
      email: 'wrong@example.com',
      password: 'wrongpassword',
    });
    component.onLogin();
    tick();

    expect(component.errorMessage).toBe('Invalid email or password');
  }));

  it('should show unexpected error message when login fails', fakeAsync(() => {
    const mockErrorResponse = { status: 500 };
    authService.login.and.returnValue(throwError(() => mockErrorResponse));

    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'password123',
    });
    component.onLogin();
    tick();
    fixture.detectChanges();
    expect(component.errorMessage).toBe(
      'An unexpected error occurred. Please try again later.',
    );
  }));

  it('should display success message from notification service', () => {
    notificationService.getMessage.and.returnValue('Registration successful');
    component.ngOnInit();
    expect(component.successMessage).toBe('Registration successful');
  });
});
