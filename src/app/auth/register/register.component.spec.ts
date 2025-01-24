import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { By, DomSanitizer } from '@angular/platform-browser';
import { NotificationService } from '../../notification.service';
import { of } from 'rxjs';
import { SecurityContext } from '@angular/core';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let notificationServiceSpy: jasmine.SpyObj<NotificationService>;
  let sanitizerSpy: jasmine.SpyObj<DomSanitizer>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);
    notificationServiceSpy = jasmine.createSpyObj('NotificationService', [
      'setMessage',
    ]);
    sanitizerSpy = jasmine.createSpyObj('DomSanitizer', ['sanitize']);
    sanitizerSpy.sanitize.and.callFake(
      (ctx: SecurityContext, value: string | null) => value,
    );

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RegisterComponent],
      providers: [
        provideRouter([]), // Correctly configure the router without routes
        provideHttpClient(), // Replace deprecated HttpClientTestingModule
        { provide: AuthService, useValue: authServiceSpy },
        { provide: DomSanitizer, useValue: sanitizerSpy },
        { provide: NotificationService, useValue: notificationServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthService register method on valid form submission', () => {
    component.registerForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'Password123',
      confirmPassword: 'Password123',
    });

    component.registerForm.markAllAsTouched();
    fixture.detectChanges();
    expect(component.registerForm.valid).toBeTrue();

    authServiceSpy.register.and.returnValue(
      of({ message: 'Registration successful! Please login.' }),
    );

    fixture.debugElement
      .query(By.css('button[type="submit"]'))
      .nativeElement.click();

    expect(authServiceSpy.register).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'Password123',
    });

    expect(notificationServiceSpy.setMessage).toHaveBeenCalledWith(
      'Registration successful! Please login.',
    );
  });
});
