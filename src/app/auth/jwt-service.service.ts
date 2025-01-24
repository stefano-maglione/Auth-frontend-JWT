import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private readonly TOKEN_KEY = 'jwtToken';

  storeToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUserEmail(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
        return decoded.sub;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }

  getUserRoles(): string | string[] {
    const token = this.getToken();
    if (token) {
      try {
        const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
        return decoded.role;
      } catch (error) {
        console.error('Error decoding token:', error);
        return [];
      }
    }
    return [];
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
