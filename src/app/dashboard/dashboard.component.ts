import { Component, OnInit } from '@angular/core';
import { JwtService } from '../auth/jwt-service.service';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeSwitcherComponent } from '../shared/theme-switcher/theme-switcher.component';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, ThemeSwitcherComponent],
})
export class DashboardComponent implements OnInit {
  userEmail: string | null = '';
  userRoles: string | string[] = [];
  message = '';

  constructor(
    private jwtService: JwtService,
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    console.log('Stored Token:', this.jwtService.getToken());

    this.userEmail = this.jwtService.getUserEmail();
    this.userRoles = this.jwtService.getUserRoles();

    if (this.userRoles.includes('ADMIN')) {
      this.fetchAdminMessage();
    } else if (this.userRoles.includes('USER')) {
      this.fetchUserMessage();
    }
  }

  fetchUserMessage() {
    this.http
      .get('http://localhost:8087/api/user/hi', { responseType: 'text' })
      .pipe(
        tap((response) => {
          this.message = response;
        }),
        catchError((error) => {
          console.error('Error fetching message:', error);
          this.message = 'Failed to retrieve  message';
          return of(null);
        }),
      )
      .subscribe();
  }

  fetchAdminMessage() {
    this.http
      .get('http://localhost:8087/api/admin/hello', { responseType: 'text' })
      .pipe(
        tap((response) => {
          this.message = response;
        }),
        catchError((error) => {
          console.error('Error fetching message:', error);
          this.message = 'Failed to retrieve message';
          return of(null);
        }),
      )
      .subscribe();
  }

  logout() {
    this.jwtService.removeToken();
    this.router.navigate(['/login']);
  }
}
