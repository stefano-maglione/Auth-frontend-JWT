import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtService } from './auth/jwt-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    const token = this.jwtService.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
