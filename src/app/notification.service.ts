import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private message = '';

  setMessage(msg: string) {
    this.message = msg;
  }

  getMessage(): string {
    const msg = this.message;
    this.message = '';
    return msg;
  }
}
