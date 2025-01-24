import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterResponse } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8087/api/user';

  constructor(private http: HttpClient) {}

  login(credentials: {
    email: string;
    password: string;
  }): Observable<HttpResponse<void>> {
    return this.http.post<void>(`${this.apiUrl}/authenticate`, credentials, {
      withCredentials: true,
      observe: 'response',
    });
  }

  register(user: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, user);
  }
}
