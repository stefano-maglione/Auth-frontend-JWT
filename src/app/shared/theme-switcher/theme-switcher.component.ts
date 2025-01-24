import { Component } from '@angular/core';
import { ThemeService } from '../../theme.service';

@Component({
  standalone: true,
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.css'],
})
export class ThemeSwitcherComponent {
  isDarkMode: boolean;

  constructor(private themeService: ThemeService) {
    this.isDarkMode = this.themeService.getCurrentTheme() === 'dark';
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDarkMode = this.themeService.getCurrentTheme() === 'dark';
  }
}
