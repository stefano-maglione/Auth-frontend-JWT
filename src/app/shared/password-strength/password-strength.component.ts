import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  imports: [CommonModule],
  standalone: true,
  selector: 'app-password-strength',
  template: `
    <div class="password-strength-meter mt-2">
      <div [ngClass]="strengthClass" class="strength-bar"></div>
    </div>
    <p class="text-white fw-bold mt-1">{{ strengthText }}</p>
  `,
  styleUrls: ['./password-strength.component.css'],
})
export class PasswordStrengthComponent {
  @Input() password = '';

  get strengthClass(): string | null {
    const strength = this.calculateStrength(this.password);
    if (!strength) {
      return '';
    }
    return strength === 'Weak'
      ? 'weak'
      : strength === 'Medium'
        ? 'medium'
        : 'strong';
  }

  get strengthText(): string | null {
    return this.calculateStrength(this.password);
  }

  private calculateStrength(password: string): string | null {
    if (!password) {
      return null;
    } else if (password.length < 6) {
      return 'Weak';
    } else if (password.match(/(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/)) {
      return 'Strong';
    } else if (
      password.match(/(?=.*[0-9])(?=.*[a-zA-Z])/) ||
      password.match(/(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/)
    ) {
      return 'Medium';
    }
    return 'Weak';
  }
}
