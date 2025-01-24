import { Component, OnInit } from '@angular/core';
import { ThemeService } from './theme.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, RouterModule],
})
export class AppComponent implements OnInit {
  title = 'auth-frontend';
  isDarkMode = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // Subscribe to theme changes
    this.themeService.themeChanged.subscribe((theme) => {
      this.isDarkMode = theme === 'dark';
    });
  }
}
