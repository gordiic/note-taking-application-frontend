import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showNotification(message: string, isSuccess: boolean, duration: number = 3000): void {
    this.snackBar.open(message, 'Close', {
      duration: duration,
      panelClass: isSuccess ? ['custom-snack-bar'] : ['custom-error-snack-bar'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
