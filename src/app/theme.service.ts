import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkMode = false;

  // Observable to track theme changes
  private themeSubject = new BehaviorSubject<string>('light');
  themeChanged = this.themeSubject.asObservable();

  constructor() {
    this.loadTheme();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.setTheme();
    this.themeSubject.next(this.getCurrentTheme()); // Notify subscribers of the change
  }

  getCurrentTheme(): string {
    return this.isDarkMode ? 'dark' : 'light';
  }

  private setTheme(): void {
    document.documentElement.setAttribute(
      'data-bs-theme',
      this.isDarkMode ? 'dark' : 'light',
    );
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';
    this.setTheme();
    this.themeSubject.next(this.getCurrentTheme()); // Notify the initial state
  }
}
